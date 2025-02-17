"use client"
import React from 'react'
import { PlaceholdersAndVanishInput } from '../placeholder-search';

const Search = () => {
    const placeholders = [
      "What's the first rule of Fight Club?",
      "Who is Tyler Durden?",
      "Where is Andrew Laeddis Hiding?",
      "Write a Javascript method to reverse a string",
      "How to assemble your own PC?",
    ];
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("submitted");
    };
  return (
    <>
     <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
      
    </>
  )
}

export default Search
