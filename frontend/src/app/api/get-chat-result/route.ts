import { createClient } from "@supabase/supabase-js"
import axios from "axios"
import { NextResponse } from "next/server"

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
  userResponse: string
  ipfsUrl: string
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: RequestBody = await request.json()
    const userResponse = body?.userResponse
    const ipfsUrl = body?.ipfsUrl

    const fileResponse = await axios.get(ipfsUrl)
    const fileData = JSON.stringify(fileResponse.data)

    const aiResponse = await askAgent({ userResponse, fileData })

    return NextResponse.json({ aiResponse }, { status: 200 })
  } catch (err: any) {
    console.error("Error processing request:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

async function askAgent({ userResponse, fileData }: { userResponse: string; fileData: string }): Promise<string> {
  try {
    // Load the agent first
    const loadResponse = await fetch(`${backendURL}/agents/example/load`, {
      method: "POST",
    })

    if (!loadResponse.ok) {
      throw new Error(`Failed to load agent. Status: ${loadResponse.status} - ${await loadResponse.text()}`)
    }
    console.log("Agent 'example' loaded successfully!")

    const userPrompt = userResponse

    const prompt = "this is file data "
    const systemPrompt = fileData

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

    return responseData.result
  } catch (error: any) {
    console.error("Error in mappingSearchAgent:", error)
    throw error
  }
}
