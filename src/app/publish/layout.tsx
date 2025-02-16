import React, { useState } from "react";
import Header from "@/components/landing-page/Header";
import { LiaEthereum } from "react-icons/lia";
import SonicLogo from "@/assets/publish-page/sonicLogo.svg"
// ${selected ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"} 
                //  ${isCompleted ? "border-2 border-green-400" : ""}`

const Layout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  
    return (
        <>
            <Header />
            <section className="px-36 mb-10">
                <h1 className="text-zinc-200 font-bold flex text-6xl mt-14 mb-2 items-center text-center">
                    <span className="pb-2"> Publish into </span>
                    <span className="scale-90 px-2">
                        {/* <LiaEthereum className="mt-1"/>  */}
                        <SonicLogo/>
                    </span>
                    
                </h1>
                <h1 className="text-zinc-300 w-4/5 text-xl mb-6">
                    Highlight the important features of your dataset or algorithm to make it more discoverable and catch the interest of data consumers.
                </h1>
                <div className="min-h-10 ">
                    {children}
                </div>
            </section>
        </>
    );
};

export default Layout;
