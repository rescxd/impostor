import { useState } from 'react'
import AddPlayers from './components/AddPlayers'
import ChooseCategory from './components/ChooseCategory'
import PassPhone from './components/PassPhone'
import Timer from './components/Timer'
import RevealImpostor from './components/RevealImpostor'

function App() {
  const [screen, setScreen] = useState('addPlayers') // addPlayers, chooseCategory, passPhone, timer, reveal
  const [players, setPlayers] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [gameData, setGameData] = useState(null) // { impostorIndex, word, hint }
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const handlePlayersReady = (playersList) => {
    setPlayers(playersList)
    setScreen('chooseCategory')
  }

  const handleCategorySelected = (category) => {
    setSelectedCategory(category)

    // Losowanie impostora i hasła
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
    // Reset do wyboru kategorii
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
        <ChooseCategory onSelect={handleCategorySelected} onBack={handleBackToPlayers} />
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
