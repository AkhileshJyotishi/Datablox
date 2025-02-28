import { NextResponse } from "next/server"

import { createClient } from "@supabase/supabase-js"

const supabaseURL = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export async function GET(request: Request) {
  if (!supabaseURL || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase credentials are missing" }, { status: 500 })
  }

  try {
    const supabase = createClient(supabaseURL, supabaseAnonKey)

    const { data: publisherData, error: publisherError } = await supabase.from("publisher").select("*")

    if (publisherError) {
      return NextResponse.json({ error: publisherError.message }, { status: 500 })
    }
    if (!publisherData) {
      return NextResponse.json({ error: "No publisher" }, { status: 404 })
    }

    return NextResponse.json({ publisherData }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
