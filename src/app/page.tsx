"use client"

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import MainMenu from '@/components/MainMenu'
import PuzzleGame from '@/components/games/PuzzleGame'
import MemoryGame from '@/components/games/MemoryGame'
import ClassificationGame from '@/components/games/ClassificationGame'
import OddOneOutGame from '@/components/games/OddOneOutGame'
import ISpyGame from '@/components/games/ISpyGame'
import TidyUpGame from '@/components/games/TidyUpGame'   // ← NUEVO
import SuccessModal from '@/components/SuccessModal'

import { GameType } from '../types'

export default function Home() {
  const [currentView, setCurrentView] = useState<GameType>('menu')
  const [showModal, setShowModal] = useState(false)
  const [playerName, setPlayerName] = useState('Explorador')

  useEffect(() => {
    // Cargar nombre del jugador desde localStorage
    const savedName = localStorage.getItem('kidName')
    if (savedName) {
      setPlayerName(savedName)
    }
  }, [])

  const handleGameComplete = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setCurrentView('menu')
  }

  const renderGame = () => {
    switch (currentView) {
      case 'puzzle':
        return <PuzzleGame onComplete={handleGameComplete} />
      case 'memory':
        return <MemoryGame onComplete={handleGameComplete} />
      case 'classification':
        return <ClassificationGame onComplete={handleGameComplete} />
      case 'oddOneOut':
        return <OddOneOutGame onComplete={handleGameComplete} />
      case 'iSpy':
        return <ISpyGame onComplete={handleGameComplete} />
      case 'tidyUp':
        return <TidyUpGame onComplete={handleGameComplete} />
      default:
        return <MainMenu onSelectGame={setCurrentView} playerName={playerName} />
    }
  }

  return (
    <>
      <Navbar 
        showHomeButton={currentView !== 'menu'} 
        onHomeClick={() => setCurrentView('menu')}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-y-auto">
        {renderGame()}
      </main>

      <SuccessModal 
        isOpen={showModal}
        onClose={handleModalClose}
      />
    </>
  )
}
