const DataPacketSkeleton: React.FC = () => {
  return (
    <div className="relative h-full min-w-[350px] animate-pulse overflow-hidden rounded-3xl border border-[#303030] bg-transparent p-6 backdrop-blur-sm">
      <div className="flex items-center text-white">
        <span className="h-6 w-6 rounded bg-gray-700 px-2"></span>
        <span className="h-4 w-16 rounded border border-b-0 border-t-0 border-[#303030] bg-gray-700 px-3 text-xs"></span>
        <span className="h-4 w-12 rounded bg-gray-700 px-3 text-xs uppercase"></span>
      </div>
      <div className="mt-3 h-6 w-3/4 rounded bg-gray-700 px-2 text-xl font-extrabold text-white"></div>
      <div className="mt-2 h-5 w-[200px] rounded bg-gray-700 px-2 text-base"></div>
      <div className="my-2 h-12 rounded bg-gray-700 px-2 text-sm"></div>
      <div className="mt-2 h-5 w-1/3 rounded bg-gray-700 px-2 text-base"></div>
      <div className="my-2 mt-auto flex h-6 w-16 gap-1 rounded bg-gray-700 px-2 text-lg"></div>
    </div>
  )
}

export default DataPacketSkeleton
