
import { FileText, Sparkles, BarChart, Zap } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "AI-Verified Datasets",
    description:
      "Access comprehensive datasets verified by advanced AI algorithms, ensuring accuracy and reliability for your decision-making process.",
    icon: FileText,
    image: "/placeholder.svg?height=400&width=500",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Real-Time Twitter Insights",
    description:
      "Harness the power of live Twitter data with real-time analysis and trending insights to stay ahead of market movements.",
    icon: BarChart,
    image: "/placeholder.svg?height=400&width=500",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Blockchain Security",
    description:
      "Every piece of data is secured and verified on the blockchain, providing an immutable record of authenticity and transparency.",
    icon: Sparkles,
    image: "/placeholder.svg?height=400&width=500",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Market Intelligence",
    description:
      "Combine verified datasets with real-time insights to make informed decisions backed by comprehensive market intelligence.",
    icon: Zap,
    image: "/placeholder.svg?height=400&width=500",
    color: "from-amber-500 to-orange-500",
  },
]

export default function Features() {
  return (
    <div className="relative bg-black flex flex-col gap-16 mb-16">
      {features.map((feature, index) => (
        <FeatureSection key={index} feature={feature} index={index} />
      ))}
    </div>
  )
}

function FeatureSection({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const { title, description, icon: Icon, image, color } = feature
  const isEven = index % 2 === 0

  return (
    <div className="flex sticky top-0 items-center rounded-3xl border border-[#303030] backdrop-blur-sm justify-center">
      <div className="container mx-auto px-10 py-16 grid md:grid-cols-2 gap-12 items-center">
        {!isEven ? (
          <>
            <FeatureContent title={title} description={description} Icon={Icon} color={color} />
            <FeatureImage image={image} />
          </>
        ) : (
          <>
            <FeatureImage image={image} />
            <FeatureContent title={title} description={description} Icon={Icon} color={color} />
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
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>

      <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

      <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center space-x-2 backdrop-blur-sm border border-white/10 transition-colors">
        <span>Learn more</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
    <div className="relative h-[450px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm z-10" />
      <Image src={image || "/placeholder.svg"} alt="Feature illustration" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/40 z-0" />
    </div>
  )
}