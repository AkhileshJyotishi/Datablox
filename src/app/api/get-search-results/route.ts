import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseURL: string | undefined = process.env.SUPABASE_URL;
const supabaseAnonKey: string | undefined = process.env.SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseAnonKey) {
    throw new Error("Supabase credentials are not set in environment variables.");
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
        const body: RequestBody = await request.json();
        const { searchQuery } = body;

        if (!searchQuery) {
            return NextResponse.json({ error: "Missing searchQuery parameter." }, { status: 400 });
        }

        const { data, error } = await supabase.from("tags").select("id");

        if (error) {
            throw new Error(error.message);
        }

        const tagIds: string[] = data.map((tag: Tag) => tag.id);

        const relevantTags = await MappingSearchAgent({searchQuery,tagIds});
        console.log(relevantTags);

        const relevantMetaDataId = await supabase.from("tags").select("*");



        return NextResponse.json({ message: "Metadata processed successfully", tagIds }, { status: 200 });
    } catch (err: any) {
        console.error("Error processing request:", err);
        return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
    }
}

async function MappingSearchAgent({ searchQuery, tagIds }: { searchQuery: string, tagIds: string[] }) {
    try {
        const systemPrompt = `
        You are an AI search assistant for an AI Data Marketplace. You are provided with a list of tags from our database and a user query. The user query may be a single keyword, a tag, or a description of their task. Your job is to analyze the query and return all relevant tags that are closely related to the user's requirement.

        Instructions:
        1. Examine the provided list of tags.
        2. Analyze the user query and identify the tags that best match the user's intent and description.

        Return the result as a stringified JSON array with the following exact format:
        ["tag1", "tag2", ...]
        Do not include any extra text or commentary—only the JSON stringified output.
        If you do not find any relevant tags, respond with an empty array: []

        Here are some examples:

        Example 1:
        Available Tags: ["weather", "finance", "health", "sports", "technology"]
        User Query: "I need datasets on economic trends and market analysis."
        Expected Output:
        ["finance", "technology"]

        Example 2:
        Available Tags: ["weather", "finance", "health", "sports", "technology", "image_recognition", "natural_language_processing"]
        User Query: "I want to analyze sentiment of sports articles."
        Expected Output:
        ["sports", "natural_language_processing"]

        Example 3:
        Available Tags: ["weather", "finance", "health", "sports", "technology"]
        User Query: "Information on the impact of climate change on global agriculture."
        Expected Output:
        ["weather"]

        Example 4:
        Available Tags: ["weather", "finance", "health", "sports", "technology"]
        User Query: "Show me datasets about quantum physics."
        Expected Output:
        []

        Example 5:
        Available Tags: ["machine_learning", "deep_learning", "computer_vision", "natural_language_processing", "data_mining"]
        User Query: "Models for processing textual data"
        Expected Output:
        ["natural_language_processing", "machine_learning", "deep_learning"]

        Now, given the list of tags and the user query provided below, output the relevant tags in the specified stringified format do not write json \\n or anything else just simple array in string form.
        `
        ;

        await fetch(`${process.env.BACKEND_URL}/agents/example/load`, { method: "POST" });
        console.log("Agent 'example' loaded successfully!");
        
        const userPrompt = `seachQuery=${searchQuery};tags=${JSON.stringify(tagIds)}`;

        let actionRes = await fetch(`${process.env.BACKEND_URL}/agent/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                connection: "gemini",
                action: "generate-text",
                params: [
                    userPrompt, 
                    systemPrompt,
                    JSON.stringify([])
                ]
            })
        });

        let response = await actionRes.json();
        return JSON.parse(response.result);
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}