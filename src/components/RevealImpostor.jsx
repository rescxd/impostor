function RevealImpostor({ player, onEndGame }) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="w-full max-w-[500px] min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center mb-16 flex-1 flex flex-col items-center justify-center">
          <div className="text-8xl mb-8 animate-bounce">🎭</div>
          <div className="text-4xl text-white font-bold mb-12">
            IMPOSTOR TO...
          </div>

          {/* Awatar */}
          <div className="mb-8">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-56 h-56 rounded-full mx-auto shadow-2xl ring-8 ring-red-500 bg-gray-700"
            />
          </div>

          {/* Imię */}
          <div className="text-6xl text-red-400 font-bold drop-shadow-2xl animate-pulse">
            {player.name}
          </div>
        </div>

        {/* Przycisk zakończ grę */}
        <div className="w-full pb-6">
          <button
            onClick={onEndGame}
            className="w-full py-5 rounded-full text-xl bg-white text-[#1a1a1a] font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
          >
            ZAKOŃCZ GRĘ
          </button>
        </div>
      </div>
    </div>
  )
}

export default RevealImpostor
