import { useCallback, useEffect } from "react"

// Ref: @KeyboardEvent["key"]: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
const useKeyPress = (targetKey: KeyboardEvent["key"], callback: ICallback) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event
      if (key === targetKey) {
        callback()
      }
    },
    [callback]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])
}

export default useKeyPress
