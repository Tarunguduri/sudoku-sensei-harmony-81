
import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for Sudoku Sensei
				"sakura": {
					50: "#fef6f9",
					100: "#feeef3",
					200: "#fdd0e0",
					300: "#fcb3cd",
					400: "#fa78a8",
					500: "#f83d82",
					600: "#df3776",
					700: "#ba2e62",
					800: "#95254f",
					900: "#7a2040",
				},
				"ink": {
					50: "#f6f7f9",
					100: "#eceef2",
					200: "#d0d4e0",
					300: "#b3bacf",
					400: "#7a87ac",
					500: "#415389",
					600: "#3b4b7b",
					700: "#313f67",
					800: "#273252",
					900: "#212943",
				},
				"bamboo": {
					50: "#f5fbf1",
					100: "#e9f7e2",
					200: "#d3eec5",
					300: "#bee5a8",
					400: "#92d46f",
					500: "#67c336",
					600: "#5db031",
					700: "#4d9229",
					800: "#3d7421",
					900: "#325f1b",
				},
				"stone": {
					50: "#f8f8f8",
					100: "#f2f2f2",
					200: "#dcdcdc",
					300: "#c6c6c6",
					400: "#9a9a9a",
					500: "#6e6e6e",
					600: "#636363",
					700: "#535353",
					800: "#424242",
					900: "#363636",
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				"float": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"pulse-subtle": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" },
				},
				"sakura-fall": {
					"0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
					"10%": { opacity: "1" },
					"100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-right": {
					"0%": { opacity: "0", transform: "translateX(20px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				"slide-in-bottom": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				"rotate-in": {
					"0%": { transform: "rotateY(90deg)", opacity: "0" },
					"100%": { transform: "rotateY(0)", opacity: "1" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"float": "float 6s ease-in-out infinite",
				"pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
				"sakura-fall": "sakura-fall 10s linear forwards",
				"fade-in": "fade-in 0.8s ease-out forwards",
				"fade-in-right": "fade-in-right 0.5s ease-out forwards",
				"scale-in": "scale-in 0.5s ease-out forwards",
				"slide-in-bottom": "slide-in-bottom 0.5s ease-out forwards",
				"rotate-in": "rotate-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
			},
			fontFamily: {
				'sans': ['Noto Sans', 'system-ui', 'sans-serif'],
				'serif': ['Noto Serif', 'Georgia', 'serif'],
				'mono': ['Noto Sans Mono', 'monospace'],
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)',
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
				'glass-pressed': '0 2px 15px rgba(0, 0, 0, 0.1)',
				'inner-glass': 'inset 0 2px 5px rgba(255, 255, 255, 0.5)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
