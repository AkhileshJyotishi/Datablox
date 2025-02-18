"use client"
import React from "react"
import DownloadButton from "./DownloadIPFS";
import { wagmiContractConfigOwner } from "@/services/contract"
import { useWriteContract } from "wagmi"
import { Button } from "@headlessui/react";


export default function BuyData({ title, tokenId, duration }: { title: string; tokenId: number; duration: number }) {
    //contract write
    const { data: hash, writeContract } = useWriteContract()
// function buyPartialOwnership(uint256 tokenId, uint256 duration) external payable {
const buyData = async () => {
  console.log("hello")
    const val = await writeContract({
      ...wagmiContractConfigOwner,
      functionName: "buyPartialOwnership",
      args: [BigInt(2), BigInt(1)],
    })
    console.log(val);
  }

  const Link = ""
  return (
    <div>
      <button onClick={() => buyData()}>Click me</button>
      <DownloadButton
        ipfsUrl={Link}
        title={title}
      />
    </div>
  )
}
