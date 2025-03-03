import { NextResponse } from "next/server"

import data from "@/data/utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get("id")
    // const user = searchParams.get("user")
    // console.log("searchParams=", id, user)
    if (Number(id) >= 0 && !isNaN(Number(id))) {
      console.log("got id=, id")
      return NextResponse.json(data[Number(id)], { status: 200 })
    } else {
      return NextResponse.json("No dataset with this id or no dataset is alloted to this user", { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
