"use client"
import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import { MdCheck } from "react-icons/md";

const PublishPage = dynamic(() => import('@/components/publish-page/PublishPage'), { ssr: false, loading: () => <p>Loading...</p> });
const Pricing = dynamic(() => import('@/components/publish-page/Pricing'), { ssr: false, loading: () => <p>Loading...</p> });
const Preview = dynamic(() => import('@/components/publish-page/Preview'), { ssr: false, loading: () => <p>Loading...</p> });
const Metadata = dynamic(() => import('@/components/publish-page/Metadata'), { ssr: false, loading: () => <p>Loading...</p> });
const Access = dynamic(() => import('@/components/publish-page/Access'), { ssr: false, loading: () => <p>Loading...</p> });

type TabButtonProps = {
    tab: number;
    selected: boolean;
    buttonName: string;
    isCompleted: boolean;
    setTabNo: React.Dispatch<React.SetStateAction<number>>;
};

const TabButton: React.FC<TabButtonProps> = ({ tab, selected, buttonName, isCompleted, setTabNo }) => (
    <button
        className={`py-2 rounded-md w-fit flex items-center text-xl gap-3 text-zinc-200`}
        onClick={() => setTabNo(tab)}
    >
        <div className={`text-sm border p-0 rounded-full h-[28px] w-[28px] flex justify-center items-center 
            ${selected ? (isCompleted ? "text-green-700 bg-white" : "text-zinc-600 bg-white") : (isCompleted ? "bg-green-700 text-white" : "text-white")} border-gray-200`}>
            {isCompleted ? <MdCheck className="font-bold text-lg" /> : tab}
        </div>
        <div className="text-zinc-200">{buttonName}</div>
    </button>
);

export default function Page() {
    const [tabNo, setTabNo] = useState<number>(1);
    const [isTabCompleted, setIsTabCompleted] = useState<boolean[]>([false, false, false, false, false]);
    const [userData, setUserData] = useState<Record<string, any>>({});

    const TabForm = useMemo(() => [
        { tabNo: 1, element: <Metadata {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />, name: "Metadata" },
        { tabNo: 2, element: <Access {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />, name: "Access" },
        { tabNo: 3, element: <Pricing {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />, name: "Pricing" },
        { tabNo: 4, element: <Preview {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />, name: "Preview" },
        { tabNo: 5, element: <PublishPage {...{ userData, setUserData, tabNo, setTabNo, setIsTabCompleted }} />, name: "Submit" }
    ], [userData, tabNo, setUserData, setTabNo, setIsTabCompleted]);

    return (
        <div className="heading border bg-zinc-900 border-zinc-700">
            <div className="px-20 flex border-b border-zinc-700 items-center justify-center py-5">
                {TabForm.map((elem, ind) => (
                    <div key={ind} className={`flex justify-start items-center ${elem.tabNo!==5 && "w-full"}`}>
                        <TabButton
                            buttonName={elem.name}
                            selected={elem.tabNo === tabNo}
                            isCompleted={isTabCompleted[elem.tabNo - 1]}
                            tab={elem.tabNo}
                            setTabNo={setTabNo}
                        />
                        {elem.tabNo !== 5 && <div className="border border-t h-0 border-zinc-700 w-full mx-3"></div>}
                    </div>
                ))}
            </div>
            {/* Display tab according to tabNo */}
            {TabForm.find(tab => tab.tabNo === tabNo)?.element}
        </div>
    );
}