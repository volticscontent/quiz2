import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const META_API_TOKEN = "EAAJ92ZCmLbAsBPEdZBTypbUnGk1lEAVPixPYW4GYe99qLFyrgcy8q4jIHZAFvaI4M1KEeK4ZAT0F3zuxMnEkMo1GZBOydoVJ9yw090xydvmon9yZCnlKDyvxaKUEtpgSInIGoqrZCBtdWKCBoLWBZAAS7p0O6BAcpIZCaP6GLsDtX8TrXIHoZC5Hgu0tvsZBPiz49LZA2gZDZD"

export const PIXEL_ID = "1769045330671882"

// Controle global de eventos já disparados
const trackedEvents = new Set<string>()

export function trackEvent(eventName: string, parameters?: Record<string, any>, allowDuplicates: boolean = true) {
  // Se o evento já foi disparado e não permite duplicatas, não dispara novamente
  if (!allowDuplicates && trackedEvents.has(eventName)) {
    console.log(`[Meta Pixel ${PIXEL_ID}] Event already tracked:`, eventName)
    return
  }

  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, parameters)
      console.log(`[Meta Pixel ${PIXEL_ID}] Tracked event:`, eventName, parameters)
      
      // Marca o evento como disparado
      if (!allowDuplicates) {
        trackedEvents.add(eventName)
      }
    } catch (error) {
      console.error('[Meta Pixel] Error tracking event:', error)
    }
  }
}
