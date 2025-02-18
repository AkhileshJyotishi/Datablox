import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseURL = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export async function GET(request: Request) {
  if (!supabaseURL || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase credentials are missing" }, { status: 500 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const metaDataId = searchParams.get("metadataid") as string | null

    if (!metaDataId) {
      return NextResponse.json({ error: "Metadata ID is required" }, { status: 400 })
    }

    const supabase = createClient(supabaseURL, supabaseAnonKey)

    const { data, error } = await supabase.from("metadata").select("*").eq("id", metaDataId).single() // Fetch only one record

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "No data found with this ID" }, { status: 404 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
