'use client'
import React from 'react';

interface CryptoCurrency {
    name: string;
    imageUrl?: string;
}

interface CryptoCurrencyListProps {
    currencies: CryptoCurrency[];
    direction: 'left' | 'right';
}

const CryptoCurrencyList: React.FC<CryptoCurrencyListProps> = ({ currencies, direction }) => {
    return (
        <div className="overflow-hidden whitespace-nowrap w-full">
            <div className={`flex gap-10 items-center w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
                {[...currencies, ...currencies].map((currency, index) => (
                    <div key={index} className="flex gap-3 items-center px-8 py-4 border border-solid border-slate-100 rounded-[52px]">
                        {currency.imageUrl && (
                            <img src={currency.imageUrl} alt={`${currency.name} logo`} className="w-10 h-10 object-contain" />
                        )}
                        <span>{currency.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MyComponent: React.FC = () => {
    const firstRowCurrencies = [
        { name: 'ABBC', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/09bb29486c7052aed77ecd8462b3bdb28ec1d24e828dfb303fe1d20d770861eb' },
        { name: 'XPA', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3b1a1754bac63a7b8795f4d0eaa2a51f2510c8c64e87600d8e0a4a6b12625e60' },
        { name: 'Amber', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9a5b6891d50bdbb6bcbb53132947c154263a4d02f0c5f2ab914ac0fa4b9164a7' },
        { name: 'Binance BUSD', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a121d337dd3c34ebd06a4deb39404710e6a077dd910cf733a8162bb1702b7fe5' },
        { name: 'Ethereum', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fcffdf1e4f6f30fd510c236ac0cb8226e204b74043050f97e9d97e8b88834ddb' },
        { name: 'Bitcoin', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/efc37dabbe1f1ed344d4e5b689301ce65b32ce7daec5084ad4d360a775ea2a44' },
    ];

    const secondRowCurrencies = [
        { name: 'Blockport', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d513498ff9d7da6ca61d9b0a5c17ef04cbbddf70851f57d0c10872cfbff853dd' },
        { name: 'Bibox', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2fc84cee59aa9e7a89fa0105f469a8cf91cd984ea342d5c36e1a915afd32aba8' },
        { name: 'Bluzelle', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aeb069803339ac0d1da03de4ac67e9bc5afb1373c90bba41e81918ff0486ec84' },
        { name: 'KUCOIN', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aa4d5387882d285bba74b5397f9f6537bfab10e4258a971ad81c539f8765e635' },
        { name: 'TRX', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ddebde6059f05a3b44f94eea4ac14d6a3af8086126e670866f4979b09adec538' },
        { name: 'All Sports', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/531fb3ec07d33aa901d9a9d48d5fd1bd415658329303bf830730a435c30eb1d0' },
    ];

    return (
        <div className="flex flex-col text-xl font-light text-center text-white gap-8">
            <CryptoCurrencyList currencies={firstRowCurrencies} direction="left" />
            <CryptoCurrencyList currencies={secondRowCurrencies} direction="right" />
        </div>
    );
};

export default function CryptoList() {
    return (
        <div>
            <MyComponent />
        </div>
    );
}
