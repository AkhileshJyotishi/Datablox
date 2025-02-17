import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextResponse } from "next/server";

const supabaseURL = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
let supabase;
if (supabaseURL && supabaseAnonKey) {
    supabase = createClient(supabaseURL, supabaseAnonKey);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const challange = searchParams.get("hub.challenge");
    const mode = searchParams.get("hub.mode");
    const verify_token = searchParams.get("hub.verify_token");
    console.log(challange, mode, verify_token);
    if (challange) {
        return NextResponse.json(+challange, { status: 200 });
    }
}

export async function POST(request: Request) {
    try {
        let body = await request.json();
        console.log(body);
        const metadata = {
            title: body.metadata.title,
            description: body.metadata.description,
            author: body.metadata.author,
            tags: JSON.stringify(body.metadata.tags),
            providerUrl: body.access.providerUrl,
            IPFS: body.access.IPFS,
            samplefile: body.access.samplefile,
            timeout: body.access.timeout,
            price: body.price,
            owner: body.owner, // wallet address 
            tokenId:body.tokenId
        }; 


        if (!(supabaseURL && supabaseAnonKey)) {
            throw new Error("Supabase URL or anon key is not defined");
        }
        supabase = createClient(supabaseURL, supabaseAnonKey);

        // Upsert the metadata and return the inserted record
        const metaDataResponse = await supabase
            .from("metadata")
            .upsert(metadata)
            .select();

        console.log(metaDataResponse);
        if (metaDataResponse.error) {
            return NextResponse.json(metaDataResponse.error, { status: 500 });
        }

        if (!metaDataResponse.data || metaDataResponse.data.length === 0) {
            throw new Error("No data returned from metadata upsert");
        }

        const metadataId = metaDataResponse.data[0].id;
        const owner = metaDataResponse.data[0].owner;

        // --- Publisher Table Logic ---
        const authorResponse = await supabase
            .from("publisher")
            .select("*")
            .eq("id", owner);

        if (authorResponse.error) {
            console.error(authorResponse.error);
            return NextResponse.json(
                { error: authorResponse.error.message },
                { status: 500 }
            );
        }

        if (authorResponse.data && authorResponse.data.length > 0) {
            // Update existing publisher record with new metadata id
            const existingMetaDataIds = authorResponse.data[0].metaDataId || [];
            const updatedMetaDataIds = Array.isArray(existingMetaDataIds)
                ? [...existingMetaDataIds, metadataId]
                : [metadataId];

            const updateResponse = await supabase
                .from("publisher")
                .update({ metaDataId: updatedMetaDataIds })
                .eq("id", owner);

            if (updateResponse.error) {
                console.error(updateResponse.error);
                return NextResponse.json(
                    { error: updateResponse.error.message },
                    { status: 500 }
                );
            }
        } else {
            // Insert new publisher record if not exists
            const insertResponse = await supabase
                .from("publisher")
                .insert({ id: owner, metaDataId: [metadataId] });

            if (insertResponse.error) {
                console.error(insertResponse.error);
                return NextResponse.json(
                    { error: insertResponse.error.message },
                    { status: 500 }
                );
            }
        }

        // --- Tags Table Logic ---
        const tags = JSON.parse(metaDataResponse.data[0].tags);
        // To accumulate any errors during the tag processing
        const tagErrors: string[] = [];

        // Use the correct column name for the tag, which is "id"
        for (const tag of tags) {
            // Check if tag exists in the "tags" table using the correct column name "id"
            const { data: tagData, error: tagError } = await supabase
                .from("tags")
                .select("*")
                .eq("id", tag);

            if (tagError) {
                console.error(`Error fetching tag "${tag}":`, tagError);
                tagErrors.push(`Error fetching tag "${tag}": ${tagError.message}`);
                continue;
            }

            if (tagData && tagData.length > 0) {
                // Tag exists; update its metadataid array if needed
                const existingMetadataIds = tagData[0].metadataid || [];
                if (!existingMetadataIds.includes(metadataId)) {
                    const updatedMetadataIds = [...existingMetadataIds, metadataId];
                    const { error: updateError } = await supabase
                        .from("tags")
                        .update({ metadataid: updatedMetadataIds })
                        .eq("id", tag);

                    if (updateError) {
                        console.error(`Error updating tag "${tag}":`, updateError);
                        tagErrors.push(
                            `Error updating tag "${tag}": ${updateError.message}`
                        );
                    } else {
                        console.log(`Updated tag "${tag}" with metadata id ${metadataId}.`);
                    }
                } else {
                    console.log(`Tag "${tag}" already contains metadata id ${metadataId}.`);
                }
            } else {
                // Tag does not exist; insert new record using the correct column name "id"
                const { error: insertError } = await supabase
                    .from("tags")
                    .insert({ id: tag, metadataid: [metadataId] });

                if (insertError) {
                    console.error(`Error inserting new tag "${tag}":`, insertError);
                    tagErrors.push(
                        `Error inserting new tag "${tag}": ${insertError.message}`
                    );
                } else {
                    console.log(`Inserted new tag "${tag}" with metadata id ${metadataId}.`);
                }
            }
        }


        // --- Final Error Check ---
        if (tagErrors.length > 0) {
            // Return a multi-status response if there were errors processing tags.
            return NextResponse.json(
                {
                    message: "Metadata processed with some tag errors.",
                    metadataId,
                    tagErrors,
                },
                { status: 207 } // 207: Multi-Status
            );
        }

        return NextResponse.json(
            { message: "Metadata processed successfully", metadataId },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("Unexpected error in POST handler:", err);
        return NextResponse.json(
            { error: err.message || "Unknown error" },
            { status: 500 }
        );
    }
}
