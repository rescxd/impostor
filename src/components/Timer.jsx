import { useState, useEffect, useRef } from 'react'

function Timer({ onEndGame, onRevealImpostor }) {
  const [timeLeft, setTimeLeft] = useState(5) // 3 minuty = 180 sekund
  const [isRunning, setIsRunning] = useState(true)
  const [isRinging, setIsRinging] = useState(false)
  const audioRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Utwórz element audio dla dzwonka
    audioRef.current = new Audio()
    audioRef.current.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBic='
    audioRef.current.loop = true

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsRinging(true)
            if (audioRef.current) {
              audioRef.current.play().catch(() => {})
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStopRinging = () => {
    setIsRinging(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const togglePause = () => {
    setIsRunning(!isRunning)
  }

  if (isRinging) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-red-600 animate-pulse cursor-pointer"
        onClick={handleStopRinging}
      >
        <div className="text-center px-8">
          <div className="text-8xl mb-8">⏰</div>
          <div className="text-6xl text-white mb-8 animate-bounce">
            KONIEC CZASU!
          </div>
          <div className="text-2xl text-white/80">
            Kliknij aby zatrzymać dzwonek
          </div>
        </div>
      </div>
    )
  }

  if (!isRinging && timeLeft === 0) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-full max-w-[500px] min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center mb-16 flex-1 flex flex-col items-center justify-center">
            <div className="text-8xl mb-8 animate-bounce">🕵️</div>
            <div className="text-5xl text-white font-bold mb-4">
              Czas minął!
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full pb-6">
            <button
              onClick={onRevealImpostor}
              className="w-full py-5 rounded-full text-xl bg-white text-[#1a1a1a] font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
            >
              ODKRYJ IMPOSTORA
            </button>

            <button
              onClick={onEndGame}
              className="w-full py-5 rounded-full text-xl bg-[#2a2a2a] text-white font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
            >
              ZAKOŃCZ GRĘ
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="w-full max-w-[500px] min-h-screen flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 pt-4">
          <h1 className="text-3xl text-white font-bold">Czas</h1>
        </div>

        {/* Timer */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`text-9xl font-bold transition-all duration-300 ${
            timeLeft <= 30 ? 'text-red-400 animate-pulse scale-110' : 'text-white'
          }`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Przyciski */}
        <div className="w-full pb-6 space-y-4">
          <button
            onClick={togglePause}
            className="w-full py-5 rounded-full text-xl bg-white text-[#1a1a1a] font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
          >
            {isRunning ? 'Pauza' : 'Wznów'}
          </button>
          <button
            onClick={onEndGame}
            className="w-full py-5 rounded-full text-xl bg-[#2a2a2a] text-white font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
          >
            Zakończ grę
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer
