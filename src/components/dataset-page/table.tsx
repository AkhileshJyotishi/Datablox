import React from "react";

// Define the type for SampleData prop
interface TableProps {
  SampleData: Array<Record<string, string>>;
}

export default function Table({ SampleData }: TableProps) {
  // If there's no data, return a message
  if (SampleData.length === 0) {
    return <p className="text-zinc-400 text-center">No data available.</p>;
  }

  return (
    <div className="overflow-x-auto w-full bg-zinc-900 p-4 rounded-md border border-zinc-700">
      <pre className="text-zinc-300 text-sm whitespace-pre-wrap">
        {JSON.stringify(SampleData, null, 2)}
      </pre>
    </div>
  );
}
