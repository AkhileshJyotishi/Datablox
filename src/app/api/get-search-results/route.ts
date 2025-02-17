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


        return NextResponse.json({ message: "Metadata processed successfully", tagIds }, { status: 200 });
    } catch (err: any) {
        console.error("Error processing request:", err);
        return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
    }
}

async function MappingSearchAgent({ searchQuery, tagIds }: { searchQuery: string, tagIds: string[] }) {
    
}