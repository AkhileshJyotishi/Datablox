import ChatBotWelcomeSection from "./ChatBotWelcomeSection"

type HelpCardProps = {
  icon: string
  color: string
  title: string
  description: string
  buttonText: string
}

const HelpCard = ({ icon, color, title, description, buttonText }: HelpCardProps) => (
  <div className="w-3/4 flex-shrink-0 rounded-lg border border-[#303030] backdrop-blur-sm px-4 py-3">
    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${color}`}>{icon}</div>
    <h3 className="mb-2 text-sm font-medium text-white">{title}</h3>
    <p className="mb-4 text-xs text-gray-400">{description}</p>
    <button className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">{buttonText}</button>
  </div>
)

export default function WelcomeSection() {
  const helpCards = [
    {
      icon: "🔍",
      color: "bg-indigo-900",
      title: "Explore Dataset Structure",
      description: "Get a detailed breakdown of the dataset, including available fields and data types.",
      buttonText: "Get Answer",
    },
    {
      icon: "📊",
      color: "bg-purple-900",
      title: "Check Data Quality",
      description: "Find out if the dataset has missing values, inconsistencies, or formatting issues.",
      buttonText: "Get Answer",
    },
    {
      icon: "📈",
      color: "bg-green-900",
      title: "Analyze Trends & Patterns",
      description: "Identify key trends, correlations, and insights extracted from the dataset.",
      buttonText: "Get Answer",
    },
    {
      icon: "🧩",
      color: "bg-blue-900",
      title: "Generate Sample Queries",
      description: "Get example queries to efficiently extract specific insights from the dataset.",
      buttonText: "Get Answer",
    },
  ]

  return (
    <div className="flex flex-col justify-center h-full items-center space-y-6 px-4">
      {/* Avatar and Welcome Message */}
      <div className="flex flex-col items-center text-center">
        <ChatBotWelcomeSection />
        <h2 className="mb-1 text-2xl font-bold text-indigo-100">Hello👋</h2>
        <h3 className="mb-4 text-xl text-indigo-200">I Am Ready To Help You</h3>
        <p className="max-w-md text-sm text-gray-400">
          Ask me anything about this dataset. I'm here to assist you!
        </p>
      </div>

      {/* Scrollable Cards */}
      <div className="no-scrollbar w-full overflow-x-auto pb-4">
        <div className="flex space-x-4 px-2">
          {helpCards.map((card, index) => (
            <HelpCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}
