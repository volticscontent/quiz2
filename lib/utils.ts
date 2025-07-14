import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const META_API_TOKEN = "EAAJ92ZCmLbAsBPD92ZClbHES4zhHc5O2atUecsIDHnX74i11ZBlYZCoWlVZAykYJYcyZBxRaOmixt3jSWGZB58WRMWtqJMV96herHZCdIvGtS9ZAkk6sZCSawlwjYtYhPgfKRS5Aou7JoXZBCOc9q2E7H3qrFTtKFYpQXFEHI1MHs6EZAzuAD12Lt2U7qh8X1MrydbIM8QZDZD"

export const PIXEL_ID = "701445339386879"

export const TIKTOK_ACCESS_TOKEN = "f0172edcadd145877ca2267d6edc0169981c7913"
export const TIKTOK_PIXEL_ID = "D1QOBFJC77U41SK2P3PG"

// Controle global de eventos já disparados
const trackedEvents = new Set<string>()

export function trackEvent(eventName: string, parameters?: Record<string, any>, allowDuplicates: boolean = true) {
  // Se o evento já foi disparado e não permite duplicatas, não dispara novamente
  if (!allowDuplicates && trackedEvents.has(eventName)) {
    console.log(`[Pixel Tracking] Event already tracked:`, eventName)
    return
  }

  if (typeof window !== 'undefined') {
    // Facebook Pixel
    if ((window as any).fbq) {
      try {
        (window as any).fbq('track', eventName, parameters)
        console.log(`[Meta Pixel ${PIXEL_ID}] Tracked event:`, eventName, parameters)
      } catch (error) {
        console.error('[Meta Pixel] Error tracking event:', error)
      }
    }

    // TikTok Pixel
    if ((window as any).ttq) {
      try {
        (window as any).ttq.track(eventName, parameters)
        console.log(`[TikTok Pixel ${TIKTOK_PIXEL_ID}] Tracked event:`, eventName, parameters)
      } catch (error) {
        console.error('[TikTok Pixel] Error tracking event:', error)
      }
    }

    // UTMify Pixel (se disponível)
    if ((window as any).utmify && typeof (window as any).utmify.track === 'function') {
      try {
        (window as any).utmify.track(eventName, parameters)
        console.log(`[UTMify Pixel] Tracked event:`, eventName, parameters)
      } catch (error) {
        console.error('[UTMify Pixel] Error tracking event:', error)
      }
    }

    // Marca o evento como disparado
    if (!allowDuplicates) {
      trackedEvents.add(eventName)
    }
  }
}

// Função específica para rastrear steps do quiz
export function trackQuizStep(step: string, questionNumber?: number, isCorrect?: boolean) {
  const stepKey = `quiz_step_${step}${questionNumber ? `_${questionNumber}` : ''}`
  
  const parameters: Record<string, any> = {}
  
  if (questionNumber) {
    parameters.question_number = questionNumber
  }
  
  if (isCorrect !== undefined) {
    parameters.is_correct = isCorrect
  }
  
  // Log detalhado para debug
  console.log(`[Quiz Step Tracking] ${stepKey}:`, parameters)
  console.log(`[Pixels] Meta: ${PIXEL_ID}, TikTok: ${TIKTOK_PIXEL_ID}`)
  
  trackEvent(stepKey, parameters, false) // Não permite duplicatas por padrão
}
