import axios from "axios";
import React from "react";

export default async function Page({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams?.query || "";
  const RelevantTags = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-search-results`,{
    searchQuery:query
  })
  const metadatas = RelevantTags.data.metadatas;
  console.log(metadatas)

  return (
    <div>
      <h1>Search Results</h1>
      {query ? <p>Showing results for: <strong>{query}</strong></p> : <p>No search query provided.</p>}
    </div>
  );
}
