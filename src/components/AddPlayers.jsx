import { useState } from 'react'

// Losowanie kolorów skóry dla awatarów Micah
const SKIN_COLORS = ['ffdbb4', 'edb98a', 'd08b5b', 'ae5d29', '614335']

const getRandomSkinColor = () => {
  return SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)]
}

const generateAvatarUrl = (name, gender) => {
  const skinColor = getRandomSkinColor()
  return `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(name)}&backgroundColor=transparent&baseColor=${skinColor}${gender === 'female' ? '&hair=full,straight01,straight02' : ''}`
}

function AddPlayers({ onReady }) {
  const [playerName, setPlayerName] = useState('')
  const [playerGender, setPlayerGender] = useState('male')
  const [players, setPlayers] = useState([])

  const handleAddPlayer = () => {
    if (playerName.trim() === '') return

    const newPlayer = {
      id: Date.now(),
      name: playerName.trim(),
      gender: playerGender,
      avatar: generateAvatarUrl(playerName.trim(), playerGender)
    }

    setPlayers([...players, newPlayer])
    setPlayerName('')
  }

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPlayer()
    }
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-[#FF2D55] to-[#FF5C7C] flex items-center justify-center">
      <div className="w-full max-w-[500px] min-h-[100svh] flex flex-col px-5 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pt-6">
          <div className="w-10"></div>
          <h1 className="text-4xl text-white font-bold">Gracze</h1>
          <button className="w-10 h-10 flex items-center justify-center text-white text-2xl rounded-lg hover:bg-white/10 active:scale-95 transition-all">

          </button>
        </div>

        {/* Lista graczy */}
        <div className="flex-1 overflow-y-auto mb-5 space-y-3">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-[#2a2a2a] rounded-2xl px-5 py-4 flex items-center justify-between shadow-md"
            >
              <span className="text-white text-xl font-normal">{player.name}</span>
              <button
                onClick={() => handleRemovePlayer(player.id)}
                className="w-8 h-8 flex items-center justify-center text-white text-lg hover:bg-white/10 rounded-lg transition-all active:scale-90"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Input z przyciskiem dodaj */}
        <div className="mb-5 flex gap-3 items-center">
          <div className="flex-1 bg-[#2a2a2a] rounded-2xl px-5 py-4 shadow-md">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Wpisz imię gracza"
              className="w-full bg-transparent text-white text-lg placeholder-gray-500 outline-none"
            />
          </div>
          <button
            onClick={handleAddPlayer}
            disabled={playerName.trim() === ''}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-md transition-all ${
              playerName.trim() === ''
                ? 'bg-[#4a4a4a] text-gray-600 cursor-not-allowed'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] active:scale-90'
            }`}
          >
            +
          </button>
        </div>

        {/* Przycisk kontynuuj - sticky na dole */}
        <div className="pt-2">
          <button
            onClick={() => onReady(players)}
            disabled={players.length < 3}
            className={`w-full py-5 rounded-full text-lg font-bold transition-all shadow-lg ${
              players.length < 3
                ? 'bg-white/40 text-white/50 cursor-not-allowed'
                : 'bg-white text-[#FF2D55] hover:shadow-xl active:scale-[0.98]'
            }`}
          >
            KONTYNUUJ | {players.length} Graczy
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddPlayers
