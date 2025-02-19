"use client"
import React, { useEffect, useState } from "react"
import DownloadButton from "./DownloadIPFS";
import { wagmiContractConfigOwner } from "@/services/contract"
import { Button } from "@headlessui/react";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract, useClient } from "wagmi"
import { config } from "@/config";
import { readContracts } from '@wagmi/core'


export default function BuyData({ title, ipfs, price, tokenId, duration }: { ipfs: string; title: string; price: number; tokenId: number; duration: number }) {
  //contract write
  const { data: hash, writeContract } = useWriteContract()
  const { address } = useAccount();
  const [own, setOwn] = useState("failure");

  const burnExpiredOwnership = async () => {
    if (address) {
      const val = await readContracts(config, {
        contracts: [{
          ...wagmiContractConfigOwner,
          functionName: "burnExpiredOwnership",
          args: [BigInt(tokenId), address, BigInt(1)],
        }]
      },)
      console.log('this val',val);
      setOwn(val[0].status);
    }
  }
  const getDatasetUri = async () => {
    if (address) {
      const val = await readContracts(config, {
        contracts: [{
          ...wagmiContractConfigOwner,
          functionName: "getDatasetUri",
          args: [BigInt(tokenId)],
        }]
      },)
      console.log('this val',val);
      // setOwn(val[0].status);
    }
  }
  useEffect(() => {
    getDatasetUri();
  }, [])
  const buyData = async () => {
    console.log("hello")
    const val = await writeContract({
      ...wagmiContractConfigOwner,
      functionName: "buyPartialOwnership",
      args: [BigInt(tokenId), BigInt(duration)],
      value: parseEther(price.toString()),
    })
    console.log(val);
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
  // if (own == "") {
  //   return <></>
  // }

  return (
    <div>
      {
        own == "failure" ? (
          <div>
            <button
              className="rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]"
              onClick={() => buyData()}
            >
              Buy now
            </button>
            <div className="max-w-80 text-xs mt-3 text-center text-gray-400">
              To access this dataset, you will purchase 1 Sonic and instantly return it to the publisher for verification.
            </div>
          </div>
        )
          :
          (
            <DownloadButton
              ipfsUrl={ipfs}
              title={title}
            />
          )
      }
    </div>
  )
}
