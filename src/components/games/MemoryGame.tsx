'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

interface MemoryGameProps {
  onComplete: () => void
}

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const themes = {
  cars: ['🚗', '🚕', '🚙', '🚌', '🏎️', '🚓'],
  bikes: ['🚲', '🛵', '🏍️', '🚵', '🚴', '🛴'],
  mixed: ['🚗', '🚲', '🚁', '✈️', '🚤', '🚜']
}

export default function MemoryGame({ onComplete }: MemoryGameProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [matchedCount, setMatchedCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const startGame = (theme: keyof typeof themes) => {
    setSelectedTheme(theme)
    const emojis = [...themes[theme], ...themes[theme]]
    const shuffled = shuffle(emojis)
    
    const newCards: Card[] = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }))
    
    setCards(newCards)
    setFlippedIndices([])
    setMatchedCount(0)
    setIsProcessing(false)
  }

  const shuffle = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleCardClick = async (index: number) => {
    if (
      isProcessing ||
      flippedIndices.length >= 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return
    }

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)
    
    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)

    if (newFlippedIndices.length === 2) {
      setIsProcessing(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      checkMatch(newFlippedIndices)
    }
  }

  const checkMatch = (indices: number[]) => {
    const [idx1, idx2] = indices
    const newCards = [...cards]

    if (newCards[idx1].emoji === newCards[idx2].emoji) {
      newCards[idx1].isMatched = true
      newCards[idx2].isMatched = true
      setMatchedCount(prev => prev + 1)
      
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.6 }
      })

      if (matchedCount + 1 === 6) {
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    } else {
      newCards[idx1].isFlipped = false
      newCards[idx2].isFlipped = false
    }

    setCards(newCards)
    setFlippedIndices([])
    setIsProcessing(false)
  }

  if (!selectedTheme) {
    return (
      <div className="text-center w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">🧠 Memoria: Elige tus fichas</h2>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => startGame('cars')}
            className="p-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition text-4xl shadow"
          >
            🏎️
          </button>
          <button
            onClick={() => startGame('bikes')}
            className="p-4 bg-green-100 rounded-xl hover:bg-green-200 transition text-4xl shadow"
          >
            🏍️
          </button>
          <button
            onClick={() => startGame('mixed')}
            className="p-4 bg-orange-100 rounded-xl hover:bg-orange-200 transition text-4xl shadow"
          >
            🚦
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">🧠 Encuentra las parejas</h2>
      <div className="grid grid-cols-4 gap-4 mx-auto" style={{ maxWidth: '500px' }}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`card-flip h-24 w-full cursor-pointer ${
              card.isFlipped || card.isMatched ? 'flipped' : ''
            } ${card.isMatched ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className="card-inner w-full h-full relative">
              <div className="card-front absolute w-full h-full bg-indigo-500 rounded-xl flex items-center justify-center text-white text-3xl font-bold border-4 border-indigo-300">
                ?
              </div>
              <div className="card-back absolute w-full h-full bg-white rounded-xl flex items-center justify-center text-4xl border-4 border-yellow-400">
                {card.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
