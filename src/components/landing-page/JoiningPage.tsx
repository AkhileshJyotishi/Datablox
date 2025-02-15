import React from 'react';
import StakingImage from '@/assets/landing-page/staking.png'
import Dao from '@/assets/landing-page/dao.png'
import LaunchPad from '@/assets/landing-page/launchpad.png'
import LearnToEarn from '@/assets/landing-page/learntoearn.png'
import SeedFunding from '@/assets/landing-page/seedfunding.png'
import { StaticImageData } from 'next/image';
import CryptoList from './CryptoList';
interface DaoSectionProps {
    title: string;
    description: string;
    buttonText: string;
    imageSrc: StaticImageData;
    dir: string;
}

export const DaoSection: React.FC<DaoSectionProps> = ({
    title,
    description,
    buttonText,
    imageSrc,
    dir
}) => {
    return (
        <section
            className={`flex items-center overflow-hidden flex-wrap gap-8 justify-between px-28 py-0 max-md:px-5 ${dir === 'right' ? 'flex-row-reverse' : 'flex-row '}`}
        >
            <div className="flex flex-col min-w-[240px] w-[612px] max-md:max-w-full h-full flex-grow">
                <div className={dir === 'right' ? 'self-end w-full flex justify-end' : 'self-start'}>
                    <div className="flex flex-col max-w-full text-white w-[612px]">
                        <h1 className="text-6xl font-semibold max-md:text-2xl">{title}</h1>
                        <p className="mt-4 text-xl leading-10 text-gray-400 max-md:max-w-full">
                            {description}
                        </p>
                            <button
                                className="flex gap-2.5 max-w-[300px] justify-center items-center px-12 py-3.5 mt-8 text-base font-semibold leading-none text-black bg-red-400 rounded-3xl shadow-[0px_-2px_15px_rgba(41,30,60,0.4)] max-md:px-5"
                                aria-label={buttonText}
                            >
                                <span className="self-stretch my-auto">{buttonText}</span>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a79cd296a05a4c74bc2ee3c80db9db0cd54c537b387b371b8c53f0b345e48b4?placeholderIfAbsent=true&apiKey=07f14cec19eb463e992759b459380087"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                />
                            </button>
                    </div>
                </div>
            </div>
            <img
                loading="lazy"
                src={imageSrc.src}
                alt="DAO community illustration"
                className="object-contain aspect-[1.06] min-w-[240px] w-[600px] max-md:max-w-full"
            />
        </section>
    );
};

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
            <CryptoList/>
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
    );
}