import Image from "next/image"
import video_1 from "@/assets/videos/video_1.gif";
import video_2 from "@/assets/videos/video_2.gif";
import video_3 from "@/assets/videos/video_3.gif";
import video_4 from "@/assets/videos/video_4.gif";

import { BarChart, FileText, Sparkles, Zap } from "lucide-react"
const features = [
  {
    title: "Ask, Verify, and Buy with Confidence",
    description:
      "Access comprehensive datasets verified by advanced AI algorithms, ensuring accuracy and reliability for your decision-making process.",
    icon: FileText,
    image: video_1.src,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Real-Time Twitter Insights",
    description:
      "Harness the power of live Twitter data with real-time analysis and trending insights to stay ahead of market movements.",
    icon: BarChart,
    image: video_2.src,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Data Tokenization",
    description:
      "Convert datasets into unique digital assets using data NFTs (ERC1155 tokens) and datatokens (ERC20 tokens). This process enables data providers to monetize their data while maintaining control over its distribution.",
    icon: Sparkles,
    image: video_3.src,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Advanced Search Capabilities",
    description:
      "Enable users to perform refined searches using various filters such as keywords, data categories, data quality metrics, and more. This allows for precise data discovery tailored to specific needs.",
    icon: Zap,
    image: video_4.src,
    color: "from-amber-500 to-orange-500",
  },
]

export default function Features() {
  return (
    <div className="relative mb-16 flex flex-col gap-16 bg-black">
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          feature={feature}
          index={index}
        />
      ))}
    </div>
  )
}

function FeatureSection({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const { title, description, icon: Icon, image, color } = feature
  const isEven = index % 2 === 0

  return (
    <div className="sticky top-0 flex items-center justify-center rounded-3xl border border-[#303030] backdrop-blur-sm">
      <div className="container mx-auto grid items-center gap-12 px-10 py-16 md:grid-cols-2">
        {!isEven ? (
          <>
            <FeatureContent
              title={title}
              description={description}
              Icon={Icon}
              color={color}
            />
            <FeatureImage image={image} />
          </>
        ) : (
          <>
            <FeatureImage image={image} />
            <FeatureContent
              title={title}
              description={description}
              Icon={Icon}
              color={color}
            />
          </>
        )}
      </div>
    </div>
  )
}

function FeatureContent({
  title,
  description,
  Icon,
  color,
}: {
  title: string
  description: string
  Icon: typeof FileText
  color: string
}) {
  return (
    <div className="space-y-6">
      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon className="h-8 w-8 text-white" />
      </div>

      <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>

      <p className="text-lg leading-relaxed text-gray-400">{description}</p>

      <button className="flex items-center space-x-2 rounded-lg border border-white/10 bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
        <span>Learn more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

function FeatureImage({ image }: { image: string }) {
  return (
    <div className="relative  w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl">
      {/* <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20" /> */}
      <Image
        src={image || "/placeholder.svg"}
        alt="Feature illustration"
        // fill
        height={1000}
        width={1000}
        className="object-contain h-[360px] bo"
      />
      {/* <div className="absolute inset-0 z-0 bg-black/40" /> */}
    </div>
  )
}
