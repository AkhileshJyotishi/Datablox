"use client"
import Access from '@/components/publish-page/Access';
import Metadata from '@/components/publish-page/Metadata';
import Preview from '@/components/publish-page/Preview';
import Pricing from '@/components/publish-page/Pricing';
import PublishPage from '@/components/publish-page/PublishPage';
import React, { useState } from 'react'
import { PiCheckCircleFill } from 'react-icons/pi';

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
    setTabNo
}: {
    tab:string
    selected: boolean;
    buttonName: string;
    isCompleted: boolean;
    setTabNo:React.Dispatch<React.SetStateAction<string>>
}) => {
    return (
        <button 
            className={
                ` py-2 rounded-md w-fit flex items-center text-xl gap-3 {text-zinc-200}`
                 
            }
            onClick = {()=>setTabNo(tab)}
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
        </button>
    );
};


export default function page() {
  const [tabNo, setTabNo] = useState("1");
  const [isTabCompleted, setIsTabCompleted] = useState<Record<string, boolean>>({
      "1": false,"2": false,"3": false,"4": false,"5": false
  });
  const TabForm = [
    { tabNo:"1",element:<Metadata/>},
    { tabNo:"2",element:<Access/> },
    { tabNo:"3",element:<Pricing/> },
    { tabNo:"4",element:<Preview/> },
    { tabNo:"5",element:<PublishPage/> },
  ]
  return  ( 
   <div className="heading border bg-zinc-900 border-zinc-700">
      <div className="px-10 bg-zinc-800 flex  border-b border-zinc-700 items-center justify-around py-5">
        {Tabs.map((elem) => (
            <>
            <div className="w-full flex justify-center items-center">
                <TabButton 
                    key={elem.tab} 
                    buttonName={elem.name} 
                    selected={elem.tab === tabNo} 
                    isCompleted={isTabCompleted[elem.tab]}
                    tab={elem.tab}
                    setTabNo = {setTabNo}
                    /> 
            </div>
            {elem.tab!="5" && <div className="border border-t h-0 border-zinc-700 w-[800px]"></div>}
            </>
        ))}
      </div>
      {/* display tab according to tabNo */}
      {TabForm.map((tab) => (
        tab.tabNo === tabNo && <div key={tab.tabNo}>{tab.element}</div>
    ))}
   </div>
  )
}
