import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Updated PSA Studios color palette - Black, White, Silver
        platinum: {
          DEFAULT: "#000000",
          100: "#000000",
          200: "#111111",
          300: "#222222",
          400: "#333333",
          500: "#000000",
          600: "#111111",
          700: "#222222",
          800: "#333333",
          900: "#444444",
        },
        "psa-black": {
          DEFAULT: "#000000",
          100: "#000000",
          200: "#111111",
          300: "#222222",
          400: "#333333",
          500: "#000000",
          600: "#111111",
          700: "#222222",
          800: "#333333",
          900: "#444444",
        },
        "psa-white": {
          DEFAULT: "#FFFFFF",
          100: "#FFFFFF",
          200: "#F8F8F8",
          300: "#F0F0F0",
          400: "#E8E8E8",
          500: "#FFFFFF",
          600: "#F8F8F8",
          700: "#F0F0F0",
          800: "#E8E8E8",
          900: "#E0E0E0",
        },
        "psa-silver": {
          DEFAULT: "#C0C0C0",
          100: "#E8E8E8",
          200: "#D8D8D8",
          300: "#C8C8C8",
          400: "#C0C0C0",
          500: "#C0C0C0",
          600: "#B0B0B0",
          700: "#A0A0A0",
          800: "#909090",
          900: "#808080",
        },
        cambridge_blue: {
          DEFAULT: "#C0C0C0",
          100: "#E8E8E8",
          200: "#D8D8D8",
          300: "#C8C8C8",
          400: "#C0C0C0",
          500: "#C0C0C0",
          600: "#B0B0B0",
          700: "#A0A0A0",
          800: "#909090",
          900: "#808080",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
