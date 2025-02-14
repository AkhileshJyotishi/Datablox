import type { Config } from "tailwindcss"
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        fadeIn: "fadeIn 0.3s forwards",
        fadeOut: "fadeOut 2s forwards",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      colors: {
        accent: {
          0: "#DFC9FF",
          1: "#6F2FCE",
          2: "#27104A",
          3: "#FFA9A9",
          4: "#9AF6C1",
          5: "#F6F4E5",
          6: "#E54E51",
        },
        primary: "#000",
        secondary: "#000",
        graph: {
          red: "#FF6A6A",
          green: "#1AC069",
        },
        dark: {
          0: "#1E2224",
          1: "#16181A",
          2: "#181B1D",
          3: "#101213",
          4: "#222629",
          5: "#1F2224",
          6: "#2C3235",
        },
        light: {
          0: "#FFFFFF",
          1: "#FBFBFB",
          2: "#F6F6F6",
          3: "#F0EDF4",
        },
      },
      fontFamily: {
        satoshi: ["Satoshi-Variable", "sans-serif"],
      },
      screens: {
        p320: "320px",
        p375: "375px",
        p425: "425px",
        p500: "500px",
        p640: "640px",
        p768: "768px",
        p960: "960px",
        p1024: "1024px",
        p1170: "1170px",
        p1440: "1440px",
        p1920: "1920px",
      },
    },
  },
}

export default config
