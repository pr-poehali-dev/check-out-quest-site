import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        quest: {
          black: "#000000", 
          yellow: "#FFDF00",
          orange: "#FF7F00",
          danger: "#990000", // красный для опасной зоны
          gold: "#D4AF37", // золотой для артефактов
          tea: "#228B22", // зеленый для чайной зоны
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "letter-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" }
        },
        "day-night-cycle": {
          "0%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(0.3)" },
          "100%": { filter: "brightness(1)" }
        },
        "flicker-light": {
          "0%, 100%": { opacity: "1" },
          "10%": { opacity: "0.8" },
          "20%": { opacity: "0.4" },
          "30%": { opacity: "0.7" },
          "40%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
          "60%": { opacity: "0.3" },
          "70%": { opacity: "0.8" },
          "80%": { opacity: "0.6" },
          "90%": { opacity: "0.9" }
        },
        "smoke-drift": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(10px) translateY(-5px)" },
          "100%": { transform: "translateX(0) translateY(0)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "letter-blink": "letter-blink 3s ease-in-out infinite",
        "day-night-cycle": "day-night-cycle 20s ease-in-out infinite",
        "flicker-light": "flicker-light 2s linear infinite",
        "smoke-drift": "smoke-drift 8s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
