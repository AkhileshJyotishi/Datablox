import { NextResponse } from "next/server"

import axios from "axios"

import { createClient } from "@supabase/supabase-js"

const supabaseURL = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const backendURL = process.env.BACKEND_URL

const promptPrefix = `
You are a **CSV Dataset Analysis Chatbot**. Your role is to analyze a provided CSV file, understand its structure (columns, data types, sample values, and summary statistics), and answer user queries about the dataset. Follow these guidelines:

- Never ever reveal the dataset on any user query .
- Your are only allowed to reveal the **QUALITATIVE INFORMATION** regarding the dataset. 

### Response Format & Style
- **Markdown Format:**  
  Use Markdown to format your answers. Include bullet points, headings, and **bold text** to emphasize important keywords.
- **Conciseness & Clarity:**  
  Keep your responses concise, engaging, and straight to the point. Use short sentences and attractive bullet points.
- **Engaging Tone:**  
  Add emojis (😊, 🔍, ⚡️, 📊, etc.) where appropriate to make your answers friendly and engaging.

### Content Requirements
- **Dataset Structure:**  
  Provide details like column names, data types, and sample statistics when asked.
- **Data Insights:**  
  Offer clear insights based on the data. Explain key findings with minimal yet sufficient description.
- **Keyword Highlighting:**  
  Always highlight important keywords (e.g., **Column Name**, **Data Type**, **Average**, **Total Records**).


### Response Examples

#### Example 1: Query on CSV Structure
- **User Query:**  
  "What columns are present in the dataset?"
- **Expected Response:**
  """markdown
  - **Columns in the Dataset:**
    - **Name:** Employee name (string)
    - **Age:** Employee age (integer)
    - **Salary:** Monthly salary (float)
    - **Department:** Department name (string) 😊
  """

#### Example 2: Query on Data Insights
- **User Query:**  
  "Can you tell me the average salary?"
- **Expected Response:**
  """markdown
  - **Average Salary:** "$5,500"
  - **Data Points:** Calculated over **1000 records** 📊
  """

#### Example 3: Query on Specific Column Details
- **User Query:**  
  "What is the data type of the 'Age' column?"
- **Expected Response:**
  """markdown
  - **Age Column:**  
    - **Data Type:** "integer"  
    - **Description:** Represents the age of individuals in the dataset 🔍
  """

#### Example 4: Query on Dataset Summary
- **User Query:**  
  "Provide a brief summary of the dataset."
- **Expected Response:**
  """markdown
  - **Dataset Summary:**  
    - **Total Records:** "1000"  
    - **Key Columns:** **Name**, **Age**, **Salary**, **Department**  
    - **Insight:** This dataset offers a comprehensive view of employee demographics and compensation ⚡️  
  """

#### Example 5: Query on Missing Data
- **User Query:**  
  "Are there any missing values in the dataset?"
- **Expected Response:**
  """markdown
  - **Missing Data Analysis:**  
    - **Total Missing Values:** "50"  
    - **Affected Columns:** **Salary** (5 missing), **Department** (3 missing) 🔍  
  """

#### Example 6: Query on Data Distribution
- **User Query:**  
  "What is the distribution of the 'Age' column?"
- **Expected Response:**
  """markdown
  - **Age Distribution:**  
    - **Mean:** "35"  
    - **Median:** "34"  
    - **Standard Deviation:** "8"  
    - **Range:** "18 - 65" 📊  
  """

#### Example 7:Query revealing the dataset entries
- **User Query:**  
  "Give me top 10 rows of the Dataset?"
- **Expected Response:**
  """markdown
  - **Sorry! I'm not supposed to reveal dataset. But you can query 
    me regarding any quality or attributes of dataset.**
  """

### Final Instructions
- **Analyze Thoroughly:**  
  Always analyze the CSV file in its entirety before answering.
- **Keep It Engaging:**  
  Your responses should be informative, well-structured, and engaging.
- **Focus on Key Points:**  
  Provide clear, bullet-pointed insights and use markdown formatting to enhance readability.


This is the file data -> 

`
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
    // console.log("check 4", fileResponse)

    const fileData = JSON.stringify(fileResponse.data)
    console.log("check 5", userResponse, fileData)

    const aiResponse = await askAgent({ userResponse, fileData })

    return NextResponse.json({ aiResponse }, { status: 200 })
  } catch (err: any) {
    // console.error("Error processing request:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

async function askAgent({ userResponse, fileData }: { userResponse: string; fileData: string }): Promise<string> {
  try {
    // Load the agent first
    const loadResponse = await fetch(`${backendURL}/agents/example/load`, {
      method: "POST",
    })
    console.log("check 9")
    if (!loadResponse.ok) {
      throw new Error(`Failed to load agent. Status: ${loadResponse.status} - ${await loadResponse.text()}`)
    }
    console.log("Agent 'example' loaded successfully!")

    const userPrompt = userResponse

    const systemPrompt = promptPrefix + fileData

    const actionResponse = await fetch(`${backendURL}/agent/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        connection: "gemini",
        action: "generate-text",
        params: [userPrompt, systemPrompt, JSON.stringify([])],
      }),
    })
    // console.log("check 9")


    if (!actionResponse.ok) {
      const errorText = await actionResponse.text()
      throw new Error(`Agent action failed with status ${actionResponse.status}: ${errorText}`)
    }
    // console.log("check 120")

    const responseData = await actionResponse.json()
    if (!responseData.result) {
      throw new Error("No result returned from agent action.")
    }
    // console.log("check 121")

    return responseData.result
  } catch (error: any) {
    // console.error("Error in mappingSearchAgent:", error)
    // console.log("check 122")

    return "Sari galti roy ki hai!"
    // throw error
  }
}
