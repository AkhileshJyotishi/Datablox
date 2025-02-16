"use client"
import Access from '@/components/publish-page/Access';
import Metadata from '@/components/publish-page/Metadata';
import Preview from '@/components/publish-page/Preview';
import Pricing from '@/components/publish-page/Pricing';
import PublishPage from '@/components/publish-page/PublishPage';
import React, { useState } from 'react'
import { MdCheck } from "react-icons/md";

const Tabs = [
    { tab: 1, name: "Metadata" },
    { tab: 2, name: "Access" },
    { tab: 3, name: "Pricing" },
    { tab: 4, name: "Preview" },
    { tab: 5, name: "Submit" },
];

const TabButton = ({
    tab,
    selected,
    buttonName,
    isCompleted,
    setTabNo
}: {
    tab: number
    selected: boolean;
    buttonName: string;
    isCompleted: boolean;
    setTabNo: React.Dispatch<React.SetStateAction<number>>
}) => {
    return (
        <button
            className={
                ` py-2 rounded-md w-fit flex items-center text-xl gap-3 {text-zinc-200}`

            }
            onClick={() => setTabNo(tab)}
        >
            <div className={`text-sm border p-0  rounded-full h-[28px] w-[28px] flex justify-center items-center ${selected ?
                    `${isCompleted ? " text-green-700 bg-white" : "text-zine-600 bg-white"} border-gray-200 ` :
                    `${isCompleted ? " bg-green-700 text-white" : "text-white"} border-gray-200`

                }
                `}>
                {
                    !isCompleted ?
                        tab :
                        <MdCheck className="font-bold text-lg" />
                }
            </div>
            <div className="text-zinc-200">
                {buttonName}
            </div>
        </button>
    );
};


export default function page() {
    const [tabNo, setTabNo] = useState(1);
    const [isTabCompleted, setIsTabCompleted] = useState<any>([false,false,false,false,false]);
    const [userData, setUserData] = useState<any>({});

    const TabForm = [
        { tabNo: 1, element: <Metadata userData={userData} setUserData={setUserData} tabNo={tabNo} setTabNo={setTabNo} setIsTabCompleted={setIsTabCompleted}/> },
        { tabNo: 2, element: <Access userData={userData} setUserData={setUserData} tabNo={tabNo} setTabNo={setTabNo} setIsTabCompleted={setIsTabCompleted}/> },
        { tabNo: 3, element: <Pricing userData={userData} setUserData={setUserData} tabNo={tabNo} setTabNo={setTabNo} setIsTabCompleted={setIsTabCompleted}/> },
        { tabNo: 4, element: <Preview userData={userData} setUserData={setUserData} tabNo={tabNo} setTabNo={setTabNo} setIsTabCompleted={setIsTabCompleted}/> },
        { tabNo: 5, element: <PublishPage userData={userData} setUserData={setUserData} tabNo={tabNo} setTabNo={setTabNo} setIsTabCompleted={setIsTabCompleted}/> },
    ]
    return (
        <div className="heading border bg-zinc-900 border-zinc-700">
            <div className="px-10 bg-zinc-800 flex  border-b border-zinc-700 items-center justify-around py-5">
                {Tabs.map((elem, ind) => (
                    <>
                        <div className="w-full flex justify-center items-center" key={ind}>
                            <TabButton
                                buttonName={elem.name}
                                selected={elem.tab === tabNo}
                                isCompleted={isTabCompleted[elem.tab]}
                                tab={elem.tab}
                                setTabNo={setTabNo}
                            />
                        </div>
                        {elem.tab != 5 && <div key={ind} className="border border-t h-0 border-zinc-700 w-[800px]"></div>}
                    </>
                ))}
            </div>
            {/* display tab according to tabNo */}
            {TabForm.map((tab,ind) => (
                tab.tabNo === tabNo && <div key={ind}>{tab.element}</div>
            ))}
        </div>
    )
}
