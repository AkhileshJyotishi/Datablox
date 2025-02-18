declare type APITypes<T = unknown | null, E = Error | null> = {
  data: T
  error: E
  message: string
}
