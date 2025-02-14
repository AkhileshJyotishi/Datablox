// declare global {
//   interface Window {
//     /* ... */
//   }
// }

declare module "tailwindcss/lib/util/flattenColorPalette"
declare interface ISources {
  [key: `${string}.sol`]: {
    content: string
  }
}
// @ts
declare type ITemporaryVariable = any

declare type IError = ITemporaryVariable

declare type ICallback<T = unknown, E = Error | null> = (error?: E, data?: T) => void

declare type IIterable<T = unknown> = Array<T>

declare interface IRichText extends React.HTMLAttributes<HTMLElement> {
  tag: string
  content: string
  style?: React.CSSProperties
  className?: string
}

declare interface IAnchor {
  title: string
  url: string
  target?: string
}
