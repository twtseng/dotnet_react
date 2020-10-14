import React from 'react'

const GameContext = React.createContext();

const Game = props => {
  const [knightPosition, setKnightPosition] = React.useState([3,3])
  return (
    <GameContext.Provider value={{knightPosition, setKnightPosition}}>
      {props.children}
    </GameContext.Provider>
  )
}

export { Game, GameContext }
export function canMoveKnight(fromX, fromY, toX, toY) {
  const dx = toX - fromX
  const dy = toY - fromY

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}


