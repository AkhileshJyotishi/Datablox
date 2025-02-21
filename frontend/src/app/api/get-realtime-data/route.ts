import data from "@/data/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (Number(id)) {
            return NextResponse.json(data[Number(id)], { status: 200 });
        } else {
            return NextResponse.json("No dataset with this id", { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
