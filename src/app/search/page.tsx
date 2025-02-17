import DataPacket from "@/components/marketplace/DataPacket";
import axios from "axios";
import React from "react";
import { motion } from "framer-motion"
import NotFoundPage from "./NotFoundPage";

export default async function Page({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams?.query || "";
  let metadatas = [];
  try {
    const RelevantTags = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-search-results`,{
      searchQuery:query
    })
    metadatas = RelevantTags.data.metadatas;
    console.log(metadatas)
  } catch (error) {
    
  }

  return (
    <div>
      {
        (metadatas && metadatas?.length>0) ?
        metadatas.map((metadata:any,index:number) => {
          const data = {
            operator:`TSANG_${index}54`,
            chain:"Sonic",
            Heading:metadata.title,
            address:metadata.address,
            description:metadata.description,
            price:metadata.price,
            sales:metadata.sales || 0,
            id:metadata.id
          }
          return (
            <DataPacket data={data} key={index}/>
          )
        }) :
        <NotFoundPage/>
      }
    </div>
  );
}
