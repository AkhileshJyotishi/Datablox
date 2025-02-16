import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
const supabaseURL = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
let supabase;
if(supabaseURL && supabaseAnonKey){
    supabase = createClient(supabaseURL,supabaseAnonKey);
}
export async function GET(request: Request, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    const challange = searchParams.get('hub.challenge');
    const mode = searchParams.get('hub.mode');
    const verify_token = searchParams.get('hub.verify_token');
    console.log(challange, mode, verify_token);
    if (challange) {
        return NextResponse.json(+challange, { status: 200 });
    }

}
export async function POST(request: Request) {
    let body = await request.json();
    console.log(body);
    let response=null;
    if(supabaseURL && supabaseAnonKey){
        supabase = createClient(supabaseURL,supabaseAnonKey);
        const { data } = await supabase.from("demo").select();
        response=data;
    }
    return NextResponse.json(response, { status: 200 });
}
