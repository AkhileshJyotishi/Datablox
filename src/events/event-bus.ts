interface Data {
  message: string
  code: string
  data: Record<string, unknown> | null
  error: Error | null
}

interface CustomEvent extends Event {
  readonly detail?: Data
}

const eventBus = {
  on(event: keyof DocumentEventMap, callback: ICallback<Data>) {
    document.addEventListener(event, (e: CustomEvent) => callback(null, e.detail))
  },
  off(event: keyof DocumentEventMap, callback: ICallback<Data>) {
    document.removeEventListener(event, (e: CustomEvent) => callback(null, e.detail))
  },
  dispatch(event: keyof DocumentEventMap, data: Data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }))
  },
}

export default eventBus
