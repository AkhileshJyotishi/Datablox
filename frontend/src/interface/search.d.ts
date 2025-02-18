declare module "react-search-box" {
  import { Component } from "react"

  interface ReactSearchBoxProps {
    placeholder?: string

    value?: string

    data: Array<{ key: string; value: string }>

    callback?: (record: { key: string; value: string }) => void
  }

  export default class ReactSearchBox extends Component<ReactSearchBoxProps> {}
}
