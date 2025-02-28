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
    const publisherAddress = searchParams.get("publisherAddress")
    if (!publisherAddress) {
      return NextResponse.json({ error: "publisherAddress is required" }, { status: 400 })
    }

    const supabase = createClient(supabaseURL, supabaseAnonKey)

    const { data: publisherData, error: publisherError } = await supabase
      .from("publisher")
      .select("*")
      .eq("id", publisherAddress)
      .single()

    if (publisherError) {
      return NextResponse.json({ error: publisherError.message }, { status: 500 })
    }
    if (!publisherData) {
      return NextResponse.json({ error: "No publisher found with this address" }, { status: 404 })
    }

    const metadataIds = publisherData.metaDataId

    if (!metadataIds || !Array.isArray(metadataIds) || metadataIds.length === 0) {
      return NextResponse.json({ metadatas: [] }, { status: 200 })
    }

    const metadataPromises = metadataIds.map(async (id: number) => {
      const { data, error } = await supabase.from("metadata").select("*").eq("id", id)

      if (error) {
        console.error(`Error fetching metadata for ID ${id}:`, error)
        return null // You can choose to handle errors differently
      }
      return data
    })

    const metadatasResult = await Promise.all(metadataPromises)

    // Filter out any null values in case some metadata fetches failed
    const metadatas = metadatasResult.filter((metadata) => metadata !== null)

    return NextResponse.json({ metadatas: metadatas || [] }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
