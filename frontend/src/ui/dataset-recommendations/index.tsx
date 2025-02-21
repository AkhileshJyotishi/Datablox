interface DatasetRecommendation {
    title: string
    description: string
    rows: number
    features: string[]
  }
  
  interface DatasetRecommendationsProps {
    recommendations: DatasetRecommendation[]
    onSelect: (recommendation: DatasetRecommendation) => void
  }
  
  export function DatasetRecommendations({ recommendations, onSelect }: DatasetRecommendationsProps) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec) => (
          <button
            key={rec.title}
            onClick={() => onSelect(rec)}
            className="group rounded-lg  border border-[#303030] bg-transparent backdrop-blur-sm p-6 text-left transition-colors hover:[#9e2750]/50 hover:bg-[#0c0c0c]"
          >
            <h3 className="mb-2 font-semibold text-[#9e2750]">{rec.title}</h3>
            <p className="mb-4 text-sm text-zinc-400">{rec.description}</p>
            <div className="text-sm">
              <p className="text-zinc-300">
                <strong>Rows:</strong> {rec.rows.toLocaleString()}
              </p>
              <p className="mt-2 text-zinc-300">
                <strong>Features:</strong>
              </p>
              <ul className="list-inside list-disc text-zinc-400">
                {rec.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    )
  }
  
  