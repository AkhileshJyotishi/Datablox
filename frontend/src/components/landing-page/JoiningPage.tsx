import React from "react"

import { StaticImageData } from "next/image"

import Dao from "@/assets/landing-page/dao.png"
import LaunchPad from "@/assets/landing-page/launchpad.png"
import LearnToEarn from "@/assets/landing-page/learntoearn.png"
import SeedFunding from "@/assets/landing-page/seedfunding.png"
import StakingImage from "@/assets/landing-page/staking.png"

import CryptoList from "./CryptoList"
interface DaoSectionProps {
  title: string
  description: string
  buttonText: string
  imageSrc: StaticImageData
  dir: string
}

export const DaoSection: React.FC<DaoSectionProps> = ({ title, description, buttonText, imageSrc, dir }) => {
  return (
    <section
      className={`flex flex-wrap items-center justify-between gap-8 overflow-hidden px-28 py-0 max-md:px-5 ${dir === "right" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex h-full w-[612px] min-w-[240px] flex-grow flex-col max-md:max-w-full">
        <div className={dir === "right" ? "flex w-full justify-end self-end" : "self-start"}>
          <div className="flex w-[612px] max-w-full flex-col text-white">
            <h1 className="text-6xl font-semibold max-md:text-2xl">{title}</h1>
            <p className="mt-4 text-xl leading-10 text-gray-400 max-md:max-w-full">{description}</p>
            <button
              className="mt-8 flex max-w-[300px] items-center justify-center gap-2.5 rounded-3xl bg-red-400 px-12 py-3.5 text-base font-semibold leading-none text-black shadow-[0px_-2px_15px_rgba(41,30,60,0.4)] max-md:px-5"
              aria-label={buttonText}
            >
              <span className="my-auto self-stretch">{buttonText}</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a79cd296a05a4c74bc2ee3c80db9db0cd54c537b387b371b8c53f0b345e48b4?placeholderIfAbsent=true&apiKey=07f14cec19eb463e992759b459380087"
                alt=""
                className="my-auto aspect-square w-6 shrink-0 self-stretch object-contain"
              />
            </button>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src={imageSrc.src}
        alt="DAO community illustration"
        className="aspect-[1.06] w-[600px] min-w-[240px] object-contain max-md:max-w-full"
      />
    </section>
  )
}

export default function JoiningPage() {
  return (
    <div>
      <DaoSection
        title="Staking"
        description="Maximize the potential of your cryptocurrencies by staking them on our secure and reliable platform. "
        buttonText="Learn more"
        imageSrc={StakingImage}
        dir="right"
      />
      <CryptoList />
      <DaoSection
        title="DAO"
        description="Join our decentralized community and take part in shaping the future of our project."
        buttonText="Learn more"
        imageSrc={Dao}
        dir="left"
      />
      <DaoSection
        title="LaunchPad"
        description="Discover the next big thing in the blockchain world through our exclusive launchpad platform. "
        buttonText="Learn more"
        imageSrc={LaunchPad}
        dir="right"
      />
      <DaoSection
        title="Learn To Earn"
        description="Unleash your potential in the crypto space with our Learn to Earn program."
        buttonText="Learn more"
        imageSrc={LearnToEarn}
        dir="left"
      />
      <DaoSection
        title="Seed Funding"
        description="Are you a promising blockchain project in need of seed funding? Look no further."
        buttonText="Learn more"
        imageSrc={SeedFunding}
        dir="right"
      />
    </div>
  )
}
