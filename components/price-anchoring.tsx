"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

interface PriceItem {
  id: number
  text: string
  originalValue: string
  currentValue: string
  emoji: string
}

const bonusItems: PriceItem[] = [
  { id: 1, text: "Parche Oficial de la Selección", originalValue: "$30", currentValue: "$0", emoji: "⚽" },
  { id: 2, text: "Nombre + Número Personalizado", originalValue: "$30", currentValue: "$0", emoji: "🇲🇽" },
  {
    id: 3,
    text: "Autógrafo Oficial de Memo Ochoa",
    originalValue: "$100", 
    currentValue: "$0",
    emoji: "✍️",
  },
]

interface PriceAnchoringProps {
  correctAnswers: number
}

export default function PriceAnchoring({ correctAnswers }: PriceAnchoringProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [showBonusItems, setShowBonusItems] = useState(false)

  useEffect(() => {
    // Show bonus items after a short delay
    const timer = setTimeout(() => {
      setShowBonusItems(true)

      // Then show each item with 1 second delay
      const showItems = async () => {
        for (let i = 0; i < bonusItems.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Changed to 1 second
          setVisibleItems((prev) => [...prev, i])
        }
      }

      showItems()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const discount = correctAnswers * 25
  const finalPrice = 50

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Product Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50">
            <Image
              src="images/jersey.avif"
              alt="Jersey Oficial Frente y Reverso"
              width={96}
              height={96}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Jersey Oficial</h3>
            <p className="text-sm text-gray-500">Edición Limitada 2024</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Precio Original</p>
          <p className="text-2xl font-light line-through text-gray-400">$150.00</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-8">
        <div className="h-px bg-gray-100" /> {/* Divider */}
        
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600 uppercase tracking-wide">Descuento Ganado</span>
          <span className="text-lg font-medium text-green-600">-${discount}</span>
        </div>

        <div className="h-px bg-gray-100" /> {/* Divider */}

        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-900 uppercase tracking-wide font-medium">Precio Final</span>
          <div className="text-right">
            <span className="block text-3xl font-semibold text-gray-900">${finalPrice.toFixed(2)}</span>
            <span className="text-sm text-green-600">Ahorro de ${discount}</span>
          </div>
        </div>
      </div>

      {/* Bonus Items */}
      {showBonusItems && (
        <div className="space-y-6">
          <div className="h-px bg-gray-100" /> {/* Divider */}
          
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Artículos Incluidos</h3>
          </div>

          <div className="space-y-4">
            {bonusItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg bg-gray-50 transition-all duration-500 ${
                  visibleItems.includes(index)
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-4"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {visibleItems.includes(index) && (
                    <CheckCircle className="h-4 w-4 text-black" />
                  )}
                  <span className="text-base text-gray-600">{item.text}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400 line-through">{item.originalValue}</span>
                  <span className="ml-2 text-sm font-medium text-gray-900">{item.currentValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
