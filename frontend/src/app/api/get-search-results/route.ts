import { NextResponse } from "next/server"

import { createClient } from "@supabase/supabase-js"

const supabaseURL = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const backendURL = process.env.BACKEND_URL

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error("Supabase credentials are not set.")
}

if (!backendURL) {
  throw new Error("Backend URL is not set.")
}

const supabase = createClient(supabaseURL, supabaseAnonKey)

interface Tag {
  id: string
}

interface RequestBody {
  searchQuery: string
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: RequestBody = await request.json()
    const { searchQuery } = body

    if (!searchQuery) {
      return NextResponse.json({ error: "Missing searchQuery." }, { status: 400 })
    }

    const { data: tagsData, error: tagsError } = await supabase.from("tags").select("id")

    if (tagsError) {
      console.error("Supabase query error:", tagsError)
      return NextResponse.json({ error: tagsError.message }, { status: 500 })
    }

    if (!tagsData) {
      return NextResponse.json({ error: "No data returned." }, { status: 500 })
    }

    const tagIds: string[] = tagsData.map((tag: Tag) => tag.id)

    let relevantTags: string[] = []
    try {
      relevantTags = await mappingSearchAgent({ searchQuery, tagIds })
    } catch (agentError: any) {
      console.error("Error in mappingSearchAgent:", agentError)
      return NextResponse.json({ error: "Failed to retrieve tags." }, { status: 500 })
    }

    if (!relevantTags || relevantTags.length === 0) {
      return NextResponse.json({ relevantTags: [], metadatas: [] }, { status: 200 })
    }

    const metadataIds: string[] = []

    const metadataPromises = relevantTags.map(async (tag) => {
      const { data: tagMetadata, error: tagMetadataError } = await supabase
        .from("tags")
        .select("metadataid")
        .eq("id", tag)

      if (tagMetadataError) {
        console.error(`Error fetching metadata for tag ${tag}:`, tagMetadataError)
        return []
      }
      return tagMetadata ? tagMetadata.flatMap((tm) => tm.metadataid) : []
    })

    const resolvedMetadataIds = await Promise.all(metadataPromises)
    metadataIds.push(...resolvedMetadataIds.flat())

    const uniqueMetadataIds = Array.from(new Set(metadataIds))

    if (uniqueMetadataIds.length === 0) {
      return NextResponse.json({ relevantTags, metadatas: [] }, { status: 200 })
    }

    const metadataFetchPromises = uniqueMetadataIds.map(async (metadataId) => {
      const { data: metadata, error: metadataError } = await supabase.from("metadata").select("*").eq("id", metadataId)

      if (metadataError) {
        console.error(`Error fetching metadata with ID ${metadataId}:`, metadataError)
        return null
      }
      return metadata ? metadata[0] : null
    })

    const metadatas = (await Promise.all(metadataFetchPromises)).filter(Boolean)

    return NextResponse.json({ relevantTags, metadatas }, { status: 200 })
  } catch (err: any) {
    console.error("Error processing request:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

async function mappingSearchAgent({
  searchQuery,
  tagIds,
}: {
  searchQuery: string
  tagIds: string[]
}): Promise<string[]> {
  try {
    const systemPrompt = `
    You are an AI search assistant for an AI Data Marketplace. You are provided with a list of tags from our database and a user query. The query can be any question or request—your sole responsibility is to extract and return only the tags that are relevant to the user's intent from the provided list, even if the query is ambiguous or indirect.
    
    ### **Strict Response Format Rules**:
    1. **Output must be a plain JSON array** with no additional formatting, explanation, or text.
    2. **Do NOT include markdown formatting**, such as \`\`\`json, \`\`\`, or newlines.
    3. **Do NOT include any extra characters** like \\n, descriptions, or commentary—only the JSON array itself.
    4. **If no relevant tags are found, return an empty array**: [].
    
    ---
    
    ### **Processing Guidelines**:
    - Analyze the provided list of tags.
    - Match the user query with relevant tags, considering synonyms and contextual relationships.
    - If a direct match is unavailable, return closely related tags instead.
    - Always return results in descending order of relevance.
    
    ---
    
    ### **Examples**:
    #### Example 1:
    Available Tags: ["weather", "finance", "health", "sports", "technology"]  
    User Query: "I need datasets on economic trends and market analysis."  
    Expected Output: ["finance", "technology"]  
    
    #### Example 2:
    Available Tags: ["weather", "finance", "health", "sports", "technology", "image_recognition", "natural_language_processing"]  
    User Query: "I want to analyze sentiment of sports articles."  
    Expected Output: ["sports", "natural_language_processing"]  
    
    #### Example 3:
    Available Tags: ["weather", "finance", "health", "sports", "technology"]  
    User Query: "Information on the impact of climate change on global agriculture."  
    Expected Output: ["weather"]  
    
    #### Example 4:
    Available Tags: ["weather", "finance", "health", "sports", "technology", "agriculture", "climate", "humidity"]  
    User Query: "Find some dataset which can help in agriculture."  
    Expected Output: ["agriculture", "climate", "humidity"]  
    
    ---
    
    ### **Final Reminder**:
    **Your response must strictly be a JSON array and nothing else.**  
    Incorrect Output:  
    \`\`\`json  
    ["Climate", "humidity", "weather"]  
    \`\`\`  
    Correct Output:  
    ["Climate", "humidity", "weather"]  
    `

    // Load the agent first
    const loadResponse = await fetch(`${backendURL}/agents/example/load`, {
      method: "POST",
    })

    if (!loadResponse.ok) {
      throw new Error(`Failed to load agent. Status: ${loadResponse.status} - ${await loadResponse.text()}`)
    }
    console.log("Agent 'example' loaded successfully!")

    // Corrected the typo: use "searchQuery" (not "seachQuery")
    const userPrompt = `searchQuery=${searchQuery};tags=${JSON.stringify(tagIds)}`

    // Send the action request to the agent
    const actionResponse = await fetch(`${backendURL}/agent/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        connection: "gemini",
        action: "generate-text",
        params: [userPrompt, systemPrompt, JSON.stringify([])],
      }),
    })

    if (!actionResponse.ok) {
      const errorText = await actionResponse.text()
      throw new Error(`Agent action failed with status ${actionResponse.status}: ${errorText}`)
    }

    const responseData = await actionResponse.json()
    if (!responseData.result) {
      throw new Error("No result returned from agent action.")
    }

    // Parse and validate the result
    let parsedResult: any
    try {
      parsedResult = JSON.parse(responseData.result)
    } catch (parseError) {
      console.error("Error parsing agent response:", parseError)
      throw new Error("Failed to parse agent response.")
    }

    if (!Array.isArray(parsedResult)) {
      throw new Error("Agent response is not an array.")
    }

    return parsedResult
  } catch (error: any) {
    console.error("Error in mappingSearchAgent:", error)
    throw error // Propagate the error to be handled in the calling function
  }
}
