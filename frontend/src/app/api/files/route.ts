// app/api/key/route.ts
import { NextResponse } from "next/server"
import { pinata } from "@/utils/config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const uuid = crypto.randomUUID()
    const keyData = await pinata.keys.create({
      keyName: uuid,
      permissions: {
        endpoints: {
          pinning: {
            pinFileToIPFS: true,
          },
        },
      },
      maxUses: 1,
    })
    return NextResponse.json(keyData, { status: 200 })
  } catch (error) {
    console.error("Error creating temporary key:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
