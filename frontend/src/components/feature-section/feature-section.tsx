import Features from "./features"

const FeatureSection = () => {
  return (
    <div className="relative z-[1000] mx-auto min-h-[100vh] w-[100vw] bg-black text-white shadow-[0_-80px_140px_rgba(0,0,0,1)]">
      {/* Dark Gradient Overlay */}
      <div className="absolute left-0 top-0 z-10 h-40 w-full bg-gradient-to-b from-black to-transparent"></div>

      <div className="relative z-20 px-8 pt-10">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-[45px] lg:leading-tight dark:text-white">
          Power Your Decisions with Verified & Real-Time Data
        </h4>

        <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 lg:text-base dark:text-neutral-300">
          Unlock AI-verified datasets and real-time Twitter insights. Whether you need reliable market data or dynamic
          event-driven insights, our platform ensures trust, transparency, and precision—secured on the blockchain.
        </p>
      </div>

      <div className="relative z-20 mx-auto mt-10 max-w-[85vw]">
        <Features />
      </div>
    </div>
  )
}

export default FeatureSection
