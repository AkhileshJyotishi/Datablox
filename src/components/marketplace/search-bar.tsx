"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "../placeholder-search";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return; // Prevent empty queries
    router.push(`/search?query=${encodeURIComponent(query)}`);
    console.log("submitted:", query);
  };

  return (
    <>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Search;
