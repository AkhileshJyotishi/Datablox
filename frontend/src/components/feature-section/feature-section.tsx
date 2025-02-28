import Features from "./features"

const FeatureSection = () => {
  return (
    <div className="relative bg-black min-h-[100vh] w-[100vw] text-white z-[1000] shadow-[0_-80px_140px_rgba(0,0,0,1)] mx-auto">
      {/* Dark Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="px-8  pt-10 relative z-20">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-[45px] lg:leading-tight dark:text-white">
          Power Your Decisions with Verified & Real-Time Data
        </h4>

        <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 lg:text-base dark:text-neutral-300">
          Unlock AI-verified datasets and real-time Twitter insights. Whether you need reliable market data or dynamic
          event-driven insights, our platform ensures trust, transparency, and precision—secured on the blockchain.
        </p>
      </div>

      <div className="relative mt-10 z-20 max-w-[85vw] mx-auto">
        <Features />
      </div>
    </div>
  )
}

export default FeatureSection

