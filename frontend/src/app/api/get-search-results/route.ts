import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const backendURL = process.env.BACKEND_URL;

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error("Supabase credentials are not set.");
}

if (!backendURL) {
  throw new Error("Backend URL is not set.");
}

const supabase = createClient(supabaseURL, supabaseAnonKey);

interface Tag {
  id: string;
}

interface RequestBody {
  searchQuery: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Parse the request body and extract searchQuery
    const { searchQuery }: RequestBody = await request.json();
    if (!searchQuery) {
      return NextResponse.json({ error: "Missing searchQuery." }, { status: 400 });
    }

    // Retrieve all tag IDs from the database.
    const { data: tagsData, error: tagsError } = await supabase.from("tags").select("id");
    if (tagsError) {
      console.error("Supabase query error:", tagsError);
      return NextResponse.json({ error: tagsError.message }, { status: 500 });
    }
    if (!tagsData) {
      return NextResponse.json({ error: "No data returned from tags table." }, { status: 500 });
    }
    const tagIds: string[] = tagsData.map((tag: Tag) => tag.id);

    // Call the agent to determine relevant tags based on the search query.
    let relevantTags: string[] = [];
    try {
      relevantTags = await mappingSearchAgent({ searchQuery, tagIds });
    } catch (agentError: any) {
      console.error("Error in mappingSearchAgent:", agentError);
      return NextResponse.json({ error: "Failed to retrieve tags." }, { status: 500 });
    }

    // If no relevant tags are found, return early.
    if (!relevantTags.length) {
      return NextResponse.json({ relevantTags, metadatas: [] }, { status: 200 });
    }

    // Retrieve metadata IDs for each relevant tag.
    const metadataPromises = relevantTags.map(async (tag) => {
      const { data: tagMetadata, error: tagMetadataError } = await supabase
        .from("tags")
        .select("metadataid")
        .eq("id", tag);

      if (tagMetadataError) {
        console.error(`Error fetching metadata for tag ${tag}:`, tagMetadataError);
        return [];
      }
      return tagMetadata ? tagMetadata.map((tm) => tm.metadataid).filter(Boolean) : [];
    });
    const resolvedMetadataIds = await Promise.all(metadataPromises);
    const metadataIds = Array.from(new Set(resolvedMetadataIds.flat()));

    if (!metadataIds.length) {
      return NextResponse.json({ relevantTags, metadatas: [] }, { status: 200 });
    }

    // Fetch metadata details for each unique metadataId.
    const metadataFetchPromises = metadataIds.map(async (metadataId) => {
      const { data: metadata, error: metadataError } = await supabase
        .from("metadata")
        .select("*")
        .eq("id", metadataId);
      if (metadataError) {
        console.error(`Error fetching metadata with ID ${metadataId}:`, metadataError);
        return null;
      }
      return metadata && metadata.length > 0 ? metadata[0] : null;
    });
    const fetchedMetadatas = (await Promise.all(metadataFetchPromises)).filter(Boolean);

    // Filter out duplicate metadata objects by their unique 'id'
    const uniqueMetadatas = Array.from(
      new Map(fetchedMetadatas.map((m: any) => [m.id, m])).values()
    );

    return NextResponse.json({ relevantTags, metadatas: uniqueMetadatas }, { status: 200 });
  } catch (err: any) {
    console.error("Error processing request:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function mappingSearchAgent({
  searchQuery,
  tagIds,
}: {
  searchQuery: string;
  tagIds: string[];
}): Promise<string[]> {
  try {
    // Improved system prompt with clear examples to reduce error margin.
    const systemPrompt =
      "You are an AI search assistant for an AI Data Marketplace. " +
      "You are provided with a list of available tags and a user search query. " +
      "Your job is to return only the tags that are relevant to the user's intent in a plain JSON array format. " +
      "Do not include any extra formatting, commentary, or explanation. If no relevant tags are found, return an empty JSON array [].\n\n" +
      "Example 1:\n" +
      'Input: searchQuery="I need datasets on economic trends and market analysis.", Available Tags: ["weather", "finance", "health", "sports", "technology"]\n' +
      'Expected Output: ["finance", "technology"]\n\n' +
      "Example 2:\n" +
      'Input: searchQuery="I want to analyze sentiment of sports articles.", Available Tags: ["weather", "finance", "health", "sports", "technology", "image_recognition", "natural_language_processing"]\n' +
      'Expected Output: ["sports", "natural_language_processing"]\n\n' +
      "Example 3:\n" +
      'Input: searchQuery="Information on the impact of climate change on global agriculture.", Available Tags: ["weather", "finance", "health", "sports", "technology"]\n' +
      'Expected Output: ["weather"]\n\n' +
      "Example 4:\n" +
      'Input: searchQuery="Find some dataset which can help in agriculture.", Available Tags: ["weather", "finance", "health", "sports", "technology", "agriculture", "climate", "humidity"]\n' +
      'Expected Output: ["agriculture", "climate", "humidity"]\n\n' +
      "Your response must be exactly a JSON array, for example: [\"tag1\", \"tag2\"].";

    // Load the agent.
    const loadResponse = await fetch(`${backendURL}/agents/example/load`, {
      method: "POST",
    });
    if (!loadResponse.ok) {
      throw new Error(
        `Failed to load agent. Status: ${loadResponse.status} - ${await loadResponse.text()}`
      );
    }
    console.log("Agent 'example' loaded successfully!");

    // Construct the user prompt with the search query and available tags.
    const userPrompt = `searchQuery=${searchQuery}; tags=${JSON.stringify(tagIds)}`;

    // Send the action request to the agent.
    const actionResponse = await fetch(`${backendURL}/agent/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        connection: "gemini",
        action: "generate-text",
        params: [userPrompt, systemPrompt, JSON.stringify([])],
      }),
    });
    if (!actionResponse.ok) {
      const errorText = await actionResponse.text();
      throw new Error(`Agent action failed with status ${actionResponse.status}: ${errorText}`);
    }

    const responseData = await actionResponse.json();
    if (!responseData.result) {
      throw new Error("No result returned from agent action.");
    }

    // Parse and validate the result ensuring it's a valid JSON array.
    let parsedResult: any;
    try {
      parsedResult = JSON.parse(responseData.result);
    } catch (parseError) {
      console.error("Error parsing agent response:", parseError);
      throw new Error("Failed to parse agent response.");
    }
    if (!Array.isArray(parsedResult)) {
      throw new Error("Agent response is not an array.");
    }
    return parsedResult;
  } catch (error: any) {
    console.error("Error in mappingSearchAgent:", error);
    throw error;
  }
}
