'use client'

import { Rocket } from 'lucide-react'

interface NavbarProps {
  showHomeButton: boolean
  onHomeClick: () => void
}

export default function Navbar({ showHomeButton, onHomeClick }: NavbarProps) {
  return (
    <nav className="bg-indigo-600 p-4 shadow-lg flex justify-between items-center z-50">
      <div className="text-white text-2xl font-bold flex items-center gap-2">
        <Rocket className="h-8 w-8" />
        <span>Aventura Kids</span>
      </div>
      
      {showHomeButton && (
        <button
          onClick={onHomeClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-2 px-6 rounded-full shadow-md transition-all btn-hover"
        >
          🏠 Inicio
        </button>
      )}
    </nav>
  )
}
