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
              src="images/chelsea-shirt.jpg"
              alt="Chelsea Official Jersey Front and Back"
              width={96}
              height={96}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Jersey Oficial</h3>
            <p className="text-sm text-gray-500">Club World Cup Edition</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Original Price</p>
          <p className="text-2xl font-light line-through text-gray-400">£149.90</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-8">
        <div className="h-px bg-gray-100" /> {/* Divider */}
        
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600 uppercase tracking-wide">Discount Earned</span>
          <span className="text-lg font-medium text-green-600">£{discount}</span>
        </div>

        <div className="h-px bg-gray-100" /> {/* Divider */}

        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-900 uppercase tracking-wide font-medium">FINAL PRICE</span>
          <div className="text-right">
            <span className="block text-3xl font-semibold text-gray-900">£49.90</span>
            <span className="text-sm text-green-600">You saved £{discount}</span>
          </div>
        </div>
      </div>

      {/* Bonus Items */}
      {showBonusItems && (
        <div className="border-t-2 border-blue-200 pt-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">What's included in your jersey? ⚽⚡</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg transition-all duration-500 opacity-100 transform translate-x-0 bg-white border border-blue-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                <span className="text-lg">⚽</span>
                <span className="font-medium text-gray-800">World Club Cup Limited Edition Badge</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-400 line-through text-sm">£30</span>
                <span className="font-bold text-green-600 text-lg ml-2">£0</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg transition-all duration-500 opacity-100 transform translate-x-0 bg-white border border-blue-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                <div className="w-8 h-8 rounded overflow-hidden">
                  <img alt="Chelsea Jersey" src="/images/chelsea-shirt.jpg" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="font-medium text-gray-800">Custom Name + Number</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-400 line-through text-sm">£30</span>
                <span className="font-bold text-green-600 text-lg ml-2">£0</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg transition-all duration-500 opacity-100 transform translate-x-0 bg-white border border-blue-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                <span className="text-lg">✍️</span>
                <span className="font-medium text-gray-800">Official Autograph by Cole Palmer</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-400 line-through text-sm">£100</span>
                <span className="font-bold text-green-600 text-lg ml-2">£0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
