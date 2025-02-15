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

  // Extract column headers dynamically
  const tableHeaders = Object.keys(SampleData[0]);

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[600px] max-w-[600px] border-collapse border border-zinc-500">
        {/* Table Header */}
        <thead>
          <tr className="bg-zinc-700 text-zinc-300">
            {tableHeaders.map((header, index) => (
              <th 
                key={index} 
                className="border border-gray-700 px-4 py-2 text-left min-w-[150px]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {SampleData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-800/50">
              {tableHeaders.map((header, colIndex) => (
                <td 
                  key={colIndex} 
                  className="border border-gray-700 px-4 py-2 text-zinc-400 min-w-[150px]"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
