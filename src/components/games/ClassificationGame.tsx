'use client'

import { useState, useRef, TouchEvent, DragEvent } from 'react'
import confetti from 'canvas-confetti'

interface ClassificationGameProps {
  onComplete: () => void
}

interface Item {
  id: number
  icon: string
  type: 'rojo' | 'amarillo'
  placed: boolean
}

const initialItems: Item[] = [
  { id: 1, icon: '🍎', type: 'rojo', placed: false },
  { id: 2, icon: '🍌', type: 'amarillo', placed: false },
  { id: 3, icon: '🍓', type: 'rojo', placed: false },
  { id: 4, icon: '🍋', type: 'amarillo', placed: false },
  { id: 5, icon: '🚘', type: 'rojo', placed: false },
  { id: 6, icon: '☀️', type: 'amarillo', placed: false }
]

export default function ClassificationGame({ onComplete }: ClassificationGameProps) {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [redItems, setRedItems] = useState<Item[]>([])
  const [yellowItems, setYellowItems] = useState<Item[]>([])
  const [draggedItem, setDraggedItem] = useState<Item | null>(null)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null)

  // Para Drag & Drop en desktop
  const handleDragStart = (e: DragEvent, item: Item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent, targetType: 'rojo' | 'amarillo') => {
    e.preventDefault()
    
    if (!draggedItem) return

    if (draggedItem.type === targetType) {
      placeItem(draggedItem, targetType)
    } else {
      // Error visual
      const zone = e.currentTarget as HTMLElement
      zone.classList.add('bg-red-200')
      setTimeout(() => zone.classList.remove('bg-red-200'), 500)
    }
    
    setDraggedItem(null)
  }

  // Para touch en móviles
  const handleTouchStart = (e: TouchEvent, item: Item) => {
    const touch = e.touches[0]
    touchStartPos.current = { x: touch.clientX, y: touch.clientY }
    setDraggedItem(item)
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!draggedItem || !touchStartPos.current) return

    const touch = e.changedTouches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    
    // Buscar la zona de drop más cercana
    const dropZone = element?.closest('[data-drop-zone]') as HTMLElement
    
    if (dropZone) {
      const targetType = dropZone.dataset.dropZone as 'rojo' | 'amarillo'
      
      if (draggedItem.type === targetType) {
        placeItem(draggedItem, targetType)
      } else {
        dropZone.classList.add('bg-red-200')
        setTimeout(() => dropZone.classList.remove('bg-red-200'), 500)
      }
    }

    setDraggedItem(null)
    touchStartPos.current = null
  }

  const placeItem = (item: Item, zone: 'rojo' | 'amarillo') => {
    // Marcar item como colocado
    setItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, placed: true } : i
    ))

    // Agregar a la zona correspondiente
    if (zone === 'rojo') {
      setRedItems(prev => [...prev, item])
    } else {
      setYellowItems(prev => [...prev, item])
    }

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 }
    })

    // Verificar si se completó
    const newItems = items.filter(i => i.id !== item.id || i.placed)
    if (newItems.every(i => i.placed)) {
      setTimeout(() => {
        onComplete()
      }, 500)
    }
  }

  return (
    <div className="flex flex-col h-full w-full max-w-2xl">
      <h2 className="text-center text-3xl font-bold text-indigo-700 mb-2">
        🎨 Agrupa los colores
      </h2>
      
      <div className="flex justify-center gap-4 p-4 min-h-[100px] mb-8 bg-white rounded-xl shadow-inner flex-wrap">
        {items.filter(item => !item.placed).map(item => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onTouchStart={(e) => handleTouchStart(e, item)}
            onTouchEnd={handleTouchEnd}
            className="draggable-item text-5xl cursor-grab active:cursor-grabbing hover:scale-110 transition"
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="flex justify-around mt-auto gap-4">
        <div
          data-drop-zone="rojo"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'rojo')}
          className="drop-zone w-40 h-40 bg-red-100 border-4 border-red-500 rounded-2xl flex flex-col items-center justify-center"
        >
          <span className="text-red-500 font-bold text-xl mb-2">Rojo</span>
          <div className="grid grid-cols-2 gap-1 w-full px-2">
            {redItems.map(item => (
              <div key={item.id} className="text-2xl">
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        <div
          data-drop-zone="amarillo"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'amarillo')}
          className="drop-zone w-40 h-40 bg-yellow-100 border-4 border-yellow-500 rounded-2xl flex flex-col items-center justify-center"
        >
          <span className="text-yellow-600 font-bold text-xl mb-2">Amarillo</span>
          <div className="grid grid-cols-2 gap-1 w-full px-2">
            {yellowItems.map(item => (
              <div key={item.id} className="text-2xl">
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
