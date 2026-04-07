import { useState, useEffect } from 'react'
import AddPlayers from './components/AddPlayers'
import ChooseCategory from './components/ChooseCategory'
import PassPhone from './components/PassPhone'
import Timer from './components/Timer'
import RevealImpostor from './components/RevealImpostor'

// 🔥 funkcja zmiany koloru paska
const setThemeColor = (color) => {
  let meta = document.querySelector("meta[name='theme-color']")

  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', color)
}

function App() {
  const [screen, setScreen] = useState('addPlayers') // addPlayers, chooseCategory, passPhone, timer, reveal
  const [players, setPlayers] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [gameData, setGameData] = useState(null)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  // 🔥 dynamiczna zmiana koloru paska
  useEffect(() => {
    if (screen === 'addPlayers') setThemeColor('#FF2D55')
    if (screen === 'chooseCategory') setThemeColor('#FF2D55')

    if (screen === 'passPhone') {
      const colors = ['#FFA726','#42A5F5','#66BB6A','#EC407A','#AB47BC','#26C6DA','#8D6E63']
      setThemeColor(colors[currentPlayerIndex % colors.length])
    }

    if (screen === 'timer') setThemeColor('#000000')
    if (screen === 'reveal') setThemeColor('#000000')
  }, [screen, currentPlayerIndex])

  const handlePlayersReady = (playersList) => {
    setPlayers(playersList)
    setScreen('chooseCategory')
  }

  const handleCategorySelected = (category) => {
    setSelectedCategory(category)

    const impostorIndex = Math.floor(Math.random() * players.length)
    const randomWordData = category.words[Math.floor(Math.random() * category.words.length)]
    const randomHint = randomWordData.hints[Math.floor(Math.random() * randomWordData.hints.length)]

    setGameData({
      impostorIndex,
      word: randomWordData.word,
      hint: randomHint
    })

    setCurrentPlayerIndex(0)
    setScreen('passPhone')
  }

  const handleAllPlayersSeen = () => {
    setScreen('timer')
  }

  const handleEndGame = () => {
    setScreen('chooseCategory')
    setSelectedCategory(null)
    setGameData(null)
    setCurrentPlayerIndex(0)
  }

  const handleRevealImpostor = () => {
    setScreen('reveal')
  }

  const handleBackToPlayers = () => {
    setScreen('addPlayers')
  }

  return (
    <>
      {screen === 'addPlayers' && (
        <AddPlayers onReady={handlePlayersReady} />
      )}

      {screen === 'chooseCategory' && (
        <ChooseCategory
          onSelect={handleCategorySelected}
          onBack={handleBackToPlayers}
        />
      )}

      {screen === 'passPhone' && (
        <PassPhone
          players={players}
          gameData={gameData}
          currentPlayerIndex={currentPlayerIndex}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
          onAllPlayersSeen={handleAllPlayersSeen}
          onBackToCategory={() => setScreen('chooseCategory')}
        />
      )}

      {screen === 'timer' && (
        <Timer
          onEndGame={handleEndGame}
          onRevealImpostor={handleRevealImpostor}
        />
      )}

      {screen === 'reveal' && (
        <RevealImpostor
          player={players[gameData.impostorIndex]}
          onEndGame={handleEndGame}
        />
      )}
    </>
  )
}

export default App