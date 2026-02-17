'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

interface OddOneOutGameProps {
  onComplete: () => void
}

interface Level {
  items: string[]
  correct: number
  question: string
}

const levels: Level[] = [
  { items: ['🍎', '🍌', '👟', '🍇' ], correct: 2, question: '¿Cuál NO es una fruta?' },
  { items: ['🐱', '🐶', '🐮', '🚗'], correct: 3, question: '¿Cuál NO es un animal?' },
  { items: ['🍕', '🚲', '🛹', '🛴'], correct: 0, question: '¿Cuál NO sirve para moverse?' },
  { items: ['⚽', '🍔', '🏀', '🎾'], correct: 1, question: '¿Cuál NO es un deporte?' },
  { items: ['🌞', '🌙', '⭐', '🍎'], correct: 3, question: '¿Cuál NO está en el cielo?' }
]

export default function OddOneOutGame({ onComplete }: OddOneOutGameProps) {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [shakeIndex, setShakeIndex] = useState<number | null>(null)

  const level = levels[currentLevel]

  const handleAnswer = async (idx: number) => {
    if (idx === level.correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      if (currentLevel < levels.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCurrentLevel(prev => prev + 1)
      } else {
        await new Promise(resolve => setTimeout(resolve, 500))
        onComplete()
        setCurrentLevel(0)
      }
    } else {
      setShakeIndex(idx)
      await new Promise(resolve => setTimeout(resolve, 500))
      setShakeIndex(null)
    }
  }

  return (
    <div className="text-center w-full">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8">
        🕵️‍♀️ Encuentra el Intruso
      </h2>
      <p className="text-xl text-gray-700 mb-8 bg-white p-4 rounded-lg shadow-sm inline-block max-w-md">
        {level.question}
      </p>
      
      <div className="flex justify-center gap-6 flex-wrap">
        {level.items.map((icon, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={`text-6xl p-8 bg-white border-b-8 border-indigo-200 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-200 ${
              shakeIndex === idx ? 'pulse-error bg-red-50' : ''
            }`}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="mt-8 text-gray-500">
        Nivel {currentLevel + 1} de {levels.length}
      </div>
    </div>
  )
}
