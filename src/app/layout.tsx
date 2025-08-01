import type { Metadata } from "next"
import { Suspense } from "react"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@/components/Analytics"
import { AnalyticsScript } from "@/components/AnalyticsScript"
import "./globals.css"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "D. Atlas Estates - Philadelphia's Trusted Diamond & Jewelry Buyer",
  description: "Get top dollar for your diamonds, gold, and estate jewelry. Trusted since 1994. Free valuation, immediate cash payment.",
  keywords: "sell diamonds philadelphia, jewelry buyer, gold buyer, estate jewelry, cash for gold",
  openGraph: {
    title: "D. Atlas Estates - Turn Your Jewelry Into Cash Today",
    description: "Philadelphia's trusted diamond and jewelry buyer since 1994. Get your free valuation today.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={montserrat.className}>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <AnalyticsScript />
        {children}
      </body>
    </html>
  )
}