'use client'

import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ISpyGameProps {
  onComplete: () => void
}

interface SpyObject {
  icon: string
  color: string
  id: number
  top: number
  left: number
  duration: number
}

const objectTemplates = [
  { icon: '🔴', color: 'rojo' },
  { icon: '🔵', color: 'azul' },
  { icon: '🍃', color: 'verde' },
  { icon: '🌻', color: 'amarillo' },
  { icon: '🚒', color: 'rojo' },
  { icon: '🍇', color: 'morado' },
  { icon: '🍊', color: 'naranja' }
]

export default function ISpyGame({ onComplete }: ISpyGameProps) {
  const [objects, setObjects] = useState<SpyObject[]>([])
  const [target, setTarget] = useState<SpyObject | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [shakeId, setShakeId] = useState<number | null>(null)
  const maxAttempts = 3

  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    const newObjects = objectTemplates.map((obj, idx) => ({
      ...obj,
      id: idx,
      top: randomInt(10, 70),
      left: randomInt(10, 70),
      duration: 2 + Math.random()
    }))
    
    setObjects(newObjects)
    setTarget(newObjects[randomInt(0, newObjects.length - 1)])
    setAttempts(0)
  }

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const handleObjectClick = async (clickedObject: SpyObject) => {
    if (clickedObject.color === target?.color) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      onComplete()
    } else {
      setShakeId(clickedObject.id)
      setAttempts(prev => prev + 1)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      setShakeId(null)

      if (attempts + 1 >= maxAttempts) {
        highlightCorrect()
        await new Promise(resolve => setTimeout(resolve, 2000))
        initGame()
      }
    }
  }

  const highlightCorrect = () => {
    // Ya se muestra visualmente cuál es el correcto
  }

  if (!target) return null

  return (
    <div className="text-center w-full h-full relative">
      <div className="bg-indigo-600 text-white p-4 rounded-b-xl shadow-lg inline-block mb-4">
        <h2 className="text-2xl font-bold">
          Veo, veo algo de color...{' '}
          <span className="uppercase text-yellow-300">{target.color}</span>
        </h2>
      </div>
      
      <div className="relative h-[400px] w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-inner border-2 border-dashed border-gray-300 overflow-hidden">
        {objects.map((obj) => (
          <div
            key={obj.id}
            onClick={() => handleObjectClick(obj)}
            className={`absolute text-5xl cursor-pointer hover:scale-125 transition animate-bounce ${
              shakeId === obj.id ? 'pulse-error' : ''
            } ${
              attempts >= maxAttempts && obj.color === target.color
                ? 'scale-150 brightness-150'
                : ''
            } ${
              attempts >= maxAttempts && obj.color !== target.color
                ? 'opacity-30'
                : ''
            }`}
            style={{
              top: `${obj.top}%`,
              left: `${obj.left}%`,
              animationDuration: `${obj.duration}s`
            }}
          >
            {obj.icon}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-lg text-gray-600">
          Intentos restantes:{' '}
          <span className="font-bold text-indigo-600">
            {maxAttempts - attempts}
          </span>
        </p>
      </div>
    </div>
  )
}
