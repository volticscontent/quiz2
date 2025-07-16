import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Configurações dos pixels usando variáveis de ambiente
export const PIXEL_ID = process.env.FACEBOOK_PIXEL_ID || "701445339386879"
export const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN || "c2e51e03eefa47186ba1a9b52ee1bba4cb037872"
export const TIKTOK_PIXEL_ID_1 = process.env.TIKTOK_PIXEL_ID_1 || "D1QOBFJC77U41SK2P3PG"
export const TIKTOK_PIXEL_ID_2 = process.env.TIKTOK_PIXEL_ID_2 || "D1RMNC3C77U41FGAQFSG"

// Controle global de eventos já disparados
const trackedEvents = new Set<string>()

// Função para enviar eventos via API do TikTok
async function sendTikTokApiEvent(eventName: string, parameters?: Record<string, any>, pixelId?: string) {
  try {
    const payload = {
      pixel_code: pixelId || TIKTOK_PIXEL_ID_1,
      event: eventName,
      event_id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      context: {
        page: {
          url: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof window !== 'undefined' ? document.referrer : ''
        },
        user: {
          external_id: '', // Pode ser preenchido com ID do usuário se disponível
          phone_number: '', // Pode ser preenchido se disponível
          email: '' // Pode ser preenchido se disponível
        },
        ad: {
          callback: ''
        }
      },
      properties: parameters || {}
    }

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN
      },
      body: JSON.stringify({
        events: [payload]
      })
    })

    if (response.ok) {
      const result = await response.json()
      console.log(`[TikTok API ${pixelId}] Event sent successfully:`, eventName, result)
      return result
    } else {
      const error = await response.text()
      console.error(`[TikTok API ${pixelId}] Error sending event:`, error)
    }
  } catch (error) {
    console.error(`[TikTok API ${pixelId}] Network error:`, error)
  }
}

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

    // TikTok Pixel 1
    if ((window as any).ttq) {
      try {
        (window as any).ttq.track(eventName, parameters)
        console.log(`[TikTok Pixel ${TIKTOK_PIXEL_ID_1}] Tracked event:`, eventName, parameters)
      } catch (error) {
        console.error('[TikTok Pixel 1] Error tracking event:', error)
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

    // Envio via API do TikTok para ambos os pixels
    if (TIKTOK_ACCESS_TOKEN && TIKTOK_ACCESS_TOKEN !== 'your_tiktok_token_here') {
      // Enviar para o primeiro pixel
      sendTikTokApiEvent(eventName, parameters, TIKTOK_PIXEL_ID_1)
      
      // Enviar para o segundo pixel também
      sendTikTokApiEvent(eventName, parameters, TIKTOK_PIXEL_ID_2)
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
  console.log(`[Pixels] Meta: ${PIXEL_ID}, TikTok 1: ${TIKTOK_PIXEL_ID_1}, TikTok 2: ${TIKTOK_PIXEL_ID_2}`)
  console.log(`[TikTok API] Token: ${TIKTOK_ACCESS_TOKEN ? 'Configured' : 'Not configured'}`)
  
  trackEvent(stepKey, parameters, false) // Não permite duplicatas por padrão
}
