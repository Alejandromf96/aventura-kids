'use client'

import { useState, useEffect } from 'react'

interface PuzzleGameProps {
  onComplete: () => void
}

export default function PuzzleGame({ onComplete }: PuzzleGameProps) {
  const [pieces, setPieces] = useState<number[]>([])
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const gridSize = 3
  const imageSrc = 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=400&h=400&fit=crop'

  useEffect(() => {
    initGame()
  }, [])

  const initGame = () => {
    const positions = Array.from({ length: gridSize * gridSize }, (_, i) => i)
    const shuffled = shuffle([...positions])
    
    // Asegurar que no esté ya resuelto
    if (isSolved(shuffled)) {
      const reshuffled = shuffle([...positions])
      setPieces(reshuffled)
    } else {
      setPieces(shuffled)
    }
  }

  const shuffle = (array: number[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const isSolved = (positions: number[]) => {
    return positions.every((pos, idx) => pos === idx)
  }

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index)
    } else {
      swapPieces(selectedPiece, index)
      setSelectedPiece(null)
    }
  }

  const swapPieces = (index1: number, index2: number) => {
    const newPieces = [...pieces]
    ;[newPieces[index1], newPieces[index2]] = [newPieces[index2], newPieces[index1]]
    setPieces(newPieces)
    
    // Check win
    if (isSolved(newPieces)) {
      setTimeout(() => {
        onComplete()
      }, 500)
    }
  }

  const getPieceStyle = (pos: number) => {
    const x = (pos % gridSize) * 100 / (gridSize - 1)
    const y = Math.floor(pos / gridSize) * 100 / (gridSize - 1)
    
    return {
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: '300%',
      backgroundPosition: `${x}% ${y}%`,
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">🧩 Rompecabezas</h2>
      <p className="mb-4 text-gray-600">Toca las piezas para moverlas</p>
      
      <div 
        className="grid grid-cols-3 gap-1 bg-gray-300 p-2 rounded-lg shadow-xl mx-auto"
        style={{ width: '320px', height: '320px' }}
      >
        {pieces.map((pos, index) => (
          <div
            key={index}
            onClick={() => handlePieceClick(index)}
            className={`w-full h-full cursor-pointer hover:opacity-90 transition-all duration-200 border border-white puzzle-piece ${
              selectedPiece === index ? 'ring-4 ring-yellow-400 selected' : ''
            }`}
            style={getPieceStyle(pos)}
          />
        ))}
      </div>
    </div>
  )
}
