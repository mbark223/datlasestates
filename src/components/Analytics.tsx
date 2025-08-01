"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = "G-XXXXXXXXXX" // Replace with actual GA4 ID
export const FB_PIXEL_ID = "XXXXXXXXXXXXXXX" // Replace with actual Facebook Pixel ID

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    
    // Google Analytics
    if (window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      })
    }
    
    // Facebook Pixel
    if (window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}

export function trackFormStart() {
  if (window.gtag) {
    window.gtag("event", "form_start", {
      event_category: "engagement",
      event_label: "lead_form",
    })
  }
  
  if (window.fbq) {
    window.fbq("track", "InitiateCheckout")
  }
}

export function trackFormSubmit() {
  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "conversion",
      event_label: "lead_form",
    })
  }
  
  if (window.fbq) {
    window.fbq("track", "Lead")
  }
}

export function trackFormError(error: string) {
  if (window.gtag) {
    window.gtag("event", "form_error", {
      event_category: "engagement",
      event_label: error,
    })
  }
}