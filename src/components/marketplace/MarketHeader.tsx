import Link from 'next/link'
import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function MarketHeader() {
    return (
        <div className='flex justify-between mx-10 py-10 items-center'>
            <div className='flex gap-8 font-bold text-gray-400 uppercase text-md'>
                <Link href="/">Ocean Market</Link>
                <Link href="/publish">Publish</Link>
                <Link href="/profile">Profile</Link>
            </div>
            <div className='flex gap-10'>
                <div className='flex text-gray-400 border border-[#303030] p-3 items-center'>
                    <input type="text" className='bg-transparent outline-none w-[300px]' placeholder='Search...' />
                    <CiSearch size={20} />
                </div>
                <button className='text-[#ff4092] font-bold border border-[#303030] bg-[#141414] px-4 text-sm'>
                    Connect Wallet
                </button>
            </div>

        </div>
    )
}
