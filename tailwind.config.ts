// Plugin oficial para animaciones de Tailwind (requerido por shadcn/ui)
import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

export default {
  // "class" significa que el modo oscuro se activa agregando la clase "dark" al <html>.
  // next-themes se encarga de agregar/remover esa clase automáticamente.
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
        // Colores semánticos del design system shadcn/ui.
        // Se definen en index.css como variables CSS y cambian con :root (light) / .dark.
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
        // Paleta de marca SmartLogix — referencian variables CSS definidas en index.css.
        // Al ser CSS vars, cambian automáticamente cuando se activa .dark.
        // Para cambiar un color en light/dark mode, edita los valores en index.css, NO aquí.
        saas: {
          black: "hsl(var(--saas-black))",
          orange: "hsl(var(--saas-orange))",
          teal: "hsl(var(--saas-teal))",
          white: "hsl(var(--saas-white))",
          darkGray: "hsl(var(--saas-darkGray))",
          tealDark: "hsl(var(--saas-tealDark))",
          tealMid: "hsl(var(--saas-tealMid))",
          tealChat: "hsl(var(--saas-tealChat))",
          orangeVivid: "hsl(var(--saas-orangeVivid))",
          orangeHover: "hsl(var(--saas-orangeHover))",
          orangeCTA: "hsl(var(--saas-orangeCTA))",
          lightBg: "hsl(var(--saas-lightBg))",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;