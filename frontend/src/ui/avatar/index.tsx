interface AvatarProps {
  src?: string
  fallback: string
  className?: string
}

export function Avatar({ src, fallback, className = "" }: AvatarProps) {
  return (
    <div className={`relative h-8 w-8 rounded-full ${className}`}>
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={fallback}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full text-sm font-medium">
          {fallback.slice(0, 2)}
        </div>
      )}
    </div>
  )
}
