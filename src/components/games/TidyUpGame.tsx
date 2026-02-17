'use client'

import { useState, useRef } from 'react'
import confetti from 'canvas-confetti'

interface TidyUpGameProps {
  onComplete: () => void
}

type ItemCategory = 'ropa' | 'juguete'

interface Item {
  id: number
  icon: string
  label: string
  category: ItemCategory
  placed: boolean
}

const ALL_ITEMS: Item[] = [
  { id: 1,  icon: '👕', label: 'Camiseta',   category: 'ropa',    placed: false },
  { id: 2,  icon: '🚂', label: 'Tren',        category: 'juguete', placed: false },
  { id: 3,  icon: '👖', label: 'Pantalón',    category: 'ropa',    placed: false },
  { id: 4,  icon: '🧸', label: 'Oso',       category: 'juguete', placed: false },
  { id: 5,  icon: '🧦', label: 'Calcetines',  category: 'ropa',    placed: false },
  { id: 6,  icon: '🚗', label: 'Carrito',  category: 'juguete', placed: false },
  { id: 7,  icon: '🧤', label: 'Guantes',     category: 'ropa',    placed: false },
  { id: 8,  icon: '🎯', label: 'Diana',       category: 'juguete', placed: false },
  { id: 9,  icon: '🏀', label: 'Balon',     category: 'juguete',    placed: false },
  { id: 10, icon: '🪀', label: 'Yoyo',        category: 'juguete', placed: false },
]

export default function TidyUpGame({ onComplete }: TidyUpGameProps) {
  const [items, setItems]               = useState<Item[]>(ALL_ITEMS)
  const [closetItems, setClosetItems]   = useState<Item[]>([])
  const [boxItems, setBoxItems]         = useState<Item[]>([])
  const [draggedItem, setDraggedItem]   = useState<Item | null>(null)
  const [closetGlow, setClosetGlow]     = useState(false)
  const [boxGlow, setBoxGlow]           = useState(false)
  const [errorZone, setErrorZone]       = useState<ItemCategory | null>(null)
  const dragRef = useRef<Item | null>(null)

  /* ─── helpers ─── */
  const triggerError = (zone: ItemCategory) => {
    setErrorZone(zone)
    setTimeout(() => setErrorZone(null), 500)
  }

  const placeItem = (item: Item, zone: ItemCategory) => {
    if (item.category !== zone) {
      triggerError(zone)
      return
    }

    setItems(prev => prev.map(i => i.id === item.id ? { ...i, placed: true } : i))

    if (zone === 'ropa')    setClosetItems(prev => [...prev, item])
    else                    setBoxItems(prev => [...prev, item])

    confetti({ particleCount: 25, spread: 50, origin: { y: 0.55 } })

    // Check win — compare against current state + this new item
    const remaining = items.filter(i => !i.placed && i.id !== item.id)
    if (remaining.length === 0) {
      setTimeout(() => {
        confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } })
        setTimeout(onComplete, 900)
      }, 400)
    }
  }

  /* ─── Drag & Drop (desktop) ─── */
  const handleDragStart = (item: Item) => {
    setDraggedItem(item)
    dragRef.current = item
  }

  const handleDragOver = (e: React.DragEvent, zone: ItemCategory) => {
    e.preventDefault()
    if (zone === 'ropa')    setClosetGlow(true)
    else                    setBoxGlow(true)
  }

  const handleDragLeave = (zone: ItemCategory) => {
    if (zone === 'ropa')    setClosetGlow(false)
    else                    setBoxGlow(false)
  }

  const handleDrop = (e: React.DragEvent, zone: ItemCategory) => {
    e.preventDefault()
    setClosetGlow(false)
    setBoxGlow(false)
    const item = dragRef.current
    if (item) placeItem(item, zone)
    setDraggedItem(null)
    dragRef.current = null
  }

  /* ─── Touch (mobile) ─── */
  const handleTouchEnd = (e: React.TouchEvent, item: Item) => {
    const touch = e.changedTouches[0]
    const el = document.elementFromPoint(touch.clientX, touch.clientY)
    const dropZone = el?.closest('[data-drop-zone]') as HTMLElement | null
    if (dropZone) {
      const zone = dropZone.dataset.dropZone as ItemCategory
      placeItem(item, zone)
    }
  }

  const pending  = items.filter(i => !i.placed)
  const progress = Math.round(((ALL_ITEMS.length - pending.length) / ALL_ITEMS.length) * 100)

  /* ─── Render ─── */
  return (
    <div className="flex flex-col items-center w-full max-w-2xl gap-4 pb-6 select-none">

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-indigo-700 leading-tight">
          🧹 ¡A Ordenar el Cuarto!
        </h2>
        <p className="text-gray-500 text-base mt-1">
          Arrastra cada cosa a su lugar
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm font-semibold text-gray-500 -mt-2">
        {ALL_ITEMS.length - pending.length} / {ALL_ITEMS.length} ordenados
      </p>

      {/* Items tray */}
      <div className="w-full min-h-[100px] bg-white rounded-2xl shadow-inner border-2 border-dashed border-indigo-200 p-4 flex flex-wrap justify-center gap-3">
        {pending.length === 0 ? (
          <p className="text-green-500 font-bold text-lg self-center">
            ¡Todo ordenado! 🎉
          </p>
        ) : (
          pending.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              onTouchStart={() => setDraggedItem(item)}
              onTouchEnd={(e) => handleTouchEnd(e, item)}
              className={`
                flex flex-col items-center cursor-grab active:cursor-grabbing
                transition-transform duration-150
                ${draggedItem?.id === item.id ? 'scale-90 opacity-50' : 'hover:scale-110'}
              `}
            >
              <span className="text-5xl leading-none">{item.icon}</span>
              <span className="text-[11px] font-semibold text-gray-500 mt-1">{item.label}</span>
            </div>
          ))
        )}
      </div>

      {/* Drop zones */}
      <div className="flex w-full gap-4">

        {/* Closet */}
        <div
          data-drop-zone="ropa"
          onDragOver={(e) => handleDragOver(e, 'ropa')}
          onDragLeave={() => handleDragLeave('ropa')}
          onDrop={(e) => handleDrop(e, 'ropa')}
          className={`
            flex-1 rounded-3xl border-4 p-3 flex flex-col items-center
            transition-all duration-200 min-h-[180px]
            ${errorZone === 'ropa'
              ? 'border-red-400 bg-red-50 scale-95'
              : closetGlow
                ? 'border-violet-500 bg-violet-100 scale-105 shadow-xl'
                : 'border-violet-300 bg-violet-50'}
          `}
        >
          {/* Closet illustration */}
          <div className="text-5xl mb-1 select-none">🚪</div>
          <p className="font-extrabold text-violet-700 text-base mb-2">Armario</p>
          <p className="text-violet-400 text-xs mb-3">Ropa aquí</p>

          <div className="flex flex-wrap justify-center gap-1">
            {closetItems.map(item => (
              <span key={item.id} className="text-2xl">{item.icon}</span>
            ))}
          </div>
        </div>

        {/* Toy box */}
        <div
          data-drop-zone="juguete"
          onDragOver={(e) => handleDragOver(e, 'juguete')}
          onDragLeave={() => handleDragLeave('juguete')}
          onDrop={(e) => handleDrop(e, 'juguete')}
          className={`
            flex-1 rounded-3xl border-4 p-3 flex flex-col items-center
            transition-all duration-200 min-h-[180px]
            ${errorZone === 'juguete'
              ? 'border-red-400 bg-red-50 scale-95'
              : boxGlow
                ? 'border-amber-500 bg-amber-100 scale-105 shadow-xl'
                : 'border-amber-300 bg-amber-50'}
          `}
        >
          {/* Box illustration */}
          <div className="text-5xl mb-1 select-none">📦</div>
          <p className="font-extrabold text-amber-700 text-base mb-2">Caja</p>
          <p className="text-amber-400 text-xs mb-3">Juguetes aquí</p>

          <div className="flex flex-wrap justify-center gap-1">
            {boxItems.map(item => (
              <span key={item.id} className="text-2xl">{item.icon}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Hint footer */}
      <p className="text-xs text-gray-400 italic text-center">
        💡 Si sueltas algo en el lugar equivocado, ¡te avisamos!
      </p>
    </div>
  )
}
