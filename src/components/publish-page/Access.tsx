"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/assets/dataset-page/img1.svg"
export default function Access() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        tags: [] as string[],
        tagInput: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        author: "",
    });
    return (
        <div className="w-full mx-auto py-6 px-32 text-white">
            <div className="mt-5 mb-10 flex w-full flex-col gap-10 items-center">

                <div className="w-full">
                    <label className="block text-lg font-bold mb-1">Title<span className="text-base text-gray-400">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-red-800"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="w-full">
                    <label className="block text-lg font-bold mb-1">Title<span className="text-base text-gray-400">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-red-800"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="w-full">
                    <label className="block text-lg font-bold mb-1">Title<span className="text-base text-gray-400">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-red-800"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center gap-10">
                    <button
                        // type="submit"
                        className="py-2 px-8 font-sans font-semibold text-lg bg-gradient-to-r from-[#9e2750] to-[#b02d5b] text-white rounded-md 
                        hover:from-[#8b2347] hover:to-[#9b284f] 
                        active:from-[#7d1f41] active:to-[#8f2449] 
                        transition-all duration-300"
                    >
                        Back
                    </button>
                    <button
                        // type="submit"
                        className="py-2 px-8 font-sans font-semibold text-lg bg-gradient-to-r from-[#9e2750] to-[#b02d5b] text-white rounded-md 
                        hover:from-[#8b2347] hover:to-[#9b284f] 
                        active:from-[#7d1f41] active:to-[#8f2449] 
                        transition-all duration-300"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
