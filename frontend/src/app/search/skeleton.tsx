const DataPacketSkeleton: React.FC = () => {
  return (
    <div
      className="relative min-w-[350px] h-full overflow-hidden rounded-3xl bg-transparent p-6 border border-[#303030] backdrop-blur-sm animate-pulse"
    >
      <div className="flex items-center text-white">
        <span className="px-2 w-6 h-6 bg-gray-700 rounded"></span>
        <span className="border border-b-0 border-t-0 border-[#303030] px-3 text-xs bg-gray-700 w-16 h-4 rounded"></span>
        <span className="px-3 text-xs uppercase bg-gray-700 w-12 h-4 rounded"></span>
      </div>
      <div className="mt-3 px-2 text-xl font-extrabold text-white bg-gray-700 h-6 w-3/4 rounded"></div>
      <div className="mt-2 w-[200px] px-2 text-base bg-gray-700 h-5 rounded"></div>
      <div className="my-2 px-2 text-sm bg-gray-700 h-12 rounded"></div>
      <div className="mt-2 px-2 text-base bg-gray-700 h-5 w-1/3 rounded"></div>
      <div className="my-2 mt-auto flex gap-1 px-2 text-lg bg-gray-700 h-6 w-16 rounded"></div>
    </div>
  );
};

export default DataPacketSkeleton