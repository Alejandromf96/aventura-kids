'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Lanzar confeti cuando se abre el modal
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-2xl animate-bounce">
        <h2 className="text-3xl font-bold text-green-500 mb-4">
          ¡Muy Bien! 🎉
        </h2>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-8 py-3 rounded-xl text-xl font-bold shadow-lg hover:bg-green-600 transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
