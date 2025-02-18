import React, { useMemo } from "react"

import Image from "next/image"

import clsx from "clsx"
import { minidenticon } from "minidenticons"

interface ChadsProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  seed: string
}

const LIGHTNESS = 0
const SATURATION = 70

const Chads: React.FC<ChadsProps> = ({ seed, className, width, height, ...props }) => {
  const svgURI = useMemo(
    () => "data:image/svg+xml;utf8," + encodeURIComponent(minidenticon(seed ?? "user", SATURATION, LIGHTNESS)),
    [seed]
  )

  return (
    <Image
      src={svgURI}
      alt={""}
      className={clsx("bg-[#EFEFEE] outline-2 outline-black", className)}
      width={(width ?? 1080) as number}
      height={(height ?? 1080) as number}
      {...props}
    />
  )
}

export default Chads
