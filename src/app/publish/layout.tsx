"use client";
import React, { useState } from "react";
import Header from "@/components/landing-page/Header";
import { LiaEthereum } from "react-icons/lia";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PiCheckCircleFill } from "react-icons/pi";
// ${selected ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"} 
                //  ${isCompleted ? "border-2 border-green-400" : ""}`
const Tabs = [
    { tab: "1", name: "Metadata" },
    { tab: "2", name: "Access" },
    { tab: "3", name: "Pricing" },
    { tab: "4", name: "Preview" },
    { tab: "5", name: "Submit" },
];

const TabButton = ({
    tab,
    selected,
    buttonName,
    isCompleted,
}: {
    tab:string
    selected: boolean;
    buttonName: string;
    isCompleted: boolean;
}) => {
    return (
        <Link 
            className={
                ` py-2 rounded-md w-fit flex items-center text-xl gap-3 {text-zinc-200}`
                 
            }
                href={`/publish/${tab}`}
        >
            <div className={`text-sm border p-0  rounded-full h-[28px] w-[28px] flex justify-center items-center ${
                selected?
                `${isCompleted?" text-green-700 bg-none":"text-zine-600 bg-white"} border-gray-200 `:
                `${isCompleted?" bg-green-700 text-black":"text-white"} border-gray-200`

            }
                `}>
                {
                    !isCompleted?
                    tab:
                    <PiCheckCircleFill className="w-full h-full"/>
                }
            </div>
            <div className="text-zinc-200">
                {buttonName}
            </div>
        </Link>
    );
};

const Layout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
    const { tab } = useParams(); // Use `tab` from the URL
    const [isTabCompleted, setIsTabCompleted] = useState<Record<string, boolean>>({
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false
    });

    return (
        <>
            <Header />
            <section className="px-36 mb-10">
                <h1 className="text-zinc-200 font-bold flex text-6xl mt-14 mb-2 text-center">
                    Publish into 
                    <span>
                        <LiaEthereum className="mt-1"/> 
                    </span>
                    ETH
                </h1>
                <h1 className="text-zinc-300 w-4/5 text-xl mb-6">
                    Highlight the important features of your dataset or algorithm to make it more discoverable and catch the interest of data consumers.
                </h1>
                <div className="min-h-10 ">
                    <div className="heading border bg-zinc-900 border-zinc-700">
                        <div className="px-10 bg-zinc-800 flex  border-b border-zinc-700 items-center justify-around py-5">
                            {Tabs.map((elem) => (
                                <>
                                <div className="w-full flex justify-center items-center">
                                    <TabButton 
                                        key={elem.tab} 
                                        buttonName={elem.name} 
                                        selected={elem.tab === tab} 
                                        isCompleted={isTabCompleted[elem.tab]}
                                        tab={elem.tab}
                                        /> 
                                </div>
                                {elem.tab!="5" && <div className="border border-t h-0 border-zinc-700 w-[800px]"></div>}
                                </>
                            ))}
                        </div>
                        {children}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Layout;
