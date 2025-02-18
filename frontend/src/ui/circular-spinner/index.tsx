interface CircularSpinnerProps {
  size?: number
}

export function CircularSpinner({ size = 1 }: CircularSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-2 border-green-500 border-t-green-700 dark:border-green-700 dark:border-t-green-500"
        style={{ width: `${size}em`, height: `${size}em` }}
      ></div>
    </div>
  )
}
