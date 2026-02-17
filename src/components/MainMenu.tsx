'use client'

interface MainMenuProps {
  onSelectGame: (game: string) => void
  playerName: string
}

interface GameOption {
  key: string
  icon: string
  title: string
  description: string
  colorClass: string
}

const games: GameOption[] = [
  {
    key: 'puzzle',
    icon: '🧩',
    title: 'Rompecabezas',
    description: 'Arma las piezas',
    colorClass: 'bg-pink-100 text-pink-600'
  },
  {
    key: 'memory',
    icon: '🧠',
    title: 'Memoria',
    description: 'Encuentra parejas',
    colorClass: 'bg-blue-100 text-blue-600'
  },
  {
    key: 'classification',
    icon: '🎨',
    title: 'Clasificación',
    description: 'Ordena por color',
    colorClass: 'bg-green-100 text-green-600'
  },
  {
    key: 'oddOneOut',
    icon: '🕵️',
    title: 'El Intruso',
    description: '¿Cuál no encaja?',
    colorClass: 'bg-purple-100 text-purple-600'
  },
  {
    key: 'iSpy',
    icon: '👀',
    title: 'Veo Veo',
    description: 'Busca objetos',
    colorClass: 'bg-yellow-100 text-yellow-600'
  },
  {
    key: 'tidyUp',
    icon: '🧹',
    title: '¡A Ordenar!',
    description: 'Guarda ropa y juguetes',
    colorClass: 'bg-teal-100 text-teal-600'
  }
]

export default function MainMenu({ onSelectGame, playerName }: MainMenuProps) {
  return (
    <div className="text-center w-full max-w-4xl animate-fade-in">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-2">
        Hola, {playerName} 👋
      </h1>
      <p className="text-gray-500 mb-10 text-xl">¿A qué quieres jugar hoy?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <button
            key={game.key}
            onClick={() => onSelectGame(game.key)}
            className={`${game.colorClass} p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-left group`}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
              {game.icon}
            </div>
            <h3 className="text-2xl font-bold mb-1">{game.title}</h3>
            <p className="opacity-80 font-medium">{game.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
