import React from "react"

// Define the type for SampleData prop
interface TableProps {
  SampleData: Array<Record<string, string>>
}

export default function Table({ SampleData }: TableProps) {
  // If there's no data, return a message
  if (SampleData.length === 0) {
    return <p className="text-center text-zinc-400">No data available.</p>
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border border-zinc-700 bg-zinc-900 p-4">
      <pre className="whitespace-pre-wrap text-sm text-zinc-300">{JSON.stringify(SampleData, null, 2)}</pre>
    </div>
  )
}
