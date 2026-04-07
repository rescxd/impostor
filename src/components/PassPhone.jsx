import { useState, useRef } from 'react'

// Kolory tła dla kolejnych graczy
const PLAYER_COLORS = [
  '#FFA726', // pomarańczowy
  '#42A5F5', // niebieski
  '#66BB6A', // zielony
  '#EC407A', // różowy
  '#AB47BC', // fioletowy
  '#26C6DA', // turkusowy
  '#8D6E63', // brązowy
]

function PassPhone({ players, gameData, currentPlayerIndex, setCurrentPlayerIndex, onAllPlayersSeen, onBackToCategory }) {
  const currentPlayer = players[currentPlayerIndex]
  const isImpostor = currentPlayerIndex === gameData.impostorIndex
  const playerColor = PLAYER_COLORS[currentPlayerIndex % PLAYER_COLORS.length]

  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)

  const handleStart = (clientY) => {
    startYRef.current = clientY
    setIsDragging(true)
  }

  const handleMove = (clientY) => {
    if (!isDragging) return

    const diff = startYRef.current - clientY
    const maxOffset = window.innerHeight * 0.5

    // Tylko ruch w górę, max 50% wysokości ekranu
    if (diff > 0) {
      setDragOffset(Math.min(diff, maxOffset))
    } else {
      setDragOffset(0)
    }
  }

  const handleEnd = () => {
    setIsDragging(false)
    setDragOffset(0)
  }

  const handleNextPlayer = () => {
    setDragOffset(0)
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    } else {
      onAllPlayersSeen()
    }
  }

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Warstwa dolna - CZARNE TŁO Z HASŁEM */}
      <div className="absolute inset-0 w-full h-full bg-black flex items-end justify-center pb-32 z-0">
        <div className="text-center px-8">
          {isImpostor ? (
            <>
              <div className="mb-8">
                <div className="text-8xl mb-8">🕵️‍♂️</div>
              </div>
              <div className="text-8xl text-red-500 mb-8 font-bold">
                IMPOSTOR
              </div>
              <div className="text-4xl text-white font-medium">
                Wskazówka: {gameData.hint}
              </div>
            </>
          ) : (
            <div className="text-9xl text-white font-bold uppercase">
              {gameData.word}
            </div>
          )}
        </div>
      </div>

      {/* Warstwa górna - KOLOROWA KARTA (przesuwa się w górę) */}
      <div
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none z-10"
        style={{
          backgroundColor: playerColor,
          transform: `translateY(-${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        onMouseDown={(e) => {
          e.preventDefault()
          handleStart(e.clientY)
        }}
        onMouseMove={(e) => {
          e.preventDefault()
          handleMove(e.clientY)
        }}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => {
          e.preventDefault()
          handleStart(e.touches[0].clientY)
        }}
        onTouchMove={(e) => {
          e.preventDefault()
          handleMove(e.touches[0].clientY)
        }}
        onTouchEnd={handleEnd}
      >
        <div className="w-full h-full flex flex-col items-center justify-between pointer-events-none">
          {/* Przycisk powrotu */}
<div className="w-full flex justify-start p-6 pt-8 pointer-events-auto">
<div
  className="text-black text-4xl font-bold cursor-pointer"
  onClick={(e) => {
    e.stopPropagation()
if (currentPlayerIndex > 0) {
  setCurrentPlayerIndex(currentPlayerIndex - 1)
} else {
  onBackToCategory()
}
  }}
  onTouchStart={(e) => e.stopPropagation()}
>
  ←
</div>
</div>

          {/* Środek - awatar i tekst */}
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="text-8xl font-bold text-black mb-16 uppercase">
              {currentPlayer.name}
            </div>

            <img
              src={currentPlayer.avatar}
              alt={currentPlayer.name}
              className="w-72 h-72 mb-16"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
            />

            <div className="text-3xl font-bold text-black text-center mb-2">
              Przesuń w górę,
            </div>
            <div className="text-3xl font-bold text-black text-center mb-12">
              aby odsłonić tajne słowo
            </div>
            <div className="text-6xl">⬆</div>
          </div>

          {/* Pusta przestrzeń na dole */}
          <div className="h-32" />
        </div>
      </div>

      {/* Przycisk następny gracz - zawsze na wierzchu */}
      <div className="fixed bottom-8 left-8 right-8 z-30">
        <button
          onClick={handleNextPlayer}
          className="w-full max-w-md mx-auto block py-6 rounded-full text-2xl bg-white text-black font-bold shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          {currentPlayerIndex < players.length - 1 ? 'NASTĘPNY GRACZ' : 'ROZPOCZNIJ GRĘ'}
        </button>
      </div>
    </div>
  )
}

export default PassPhone
