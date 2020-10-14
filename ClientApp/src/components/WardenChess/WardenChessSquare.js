import React from 'react'
import { ItemTypes } from './WardenChessItemTypes'
import { GameContext } from './WardenChessGameState'

const WardenChessSquare = ({ x, y, children }) => {
  const {setKnightPosition} = React.useContext(GameContext);
  const fill = (x+y)%2===1 ? 'tan' : 'beige'

  return <div 
    style={{ 
    backgroundColor: fill,
    border:'solid 1px black',
    width: '100%',
    height: '100%'
    }}
    onClick={() => setKnightPosition([x,y])}
    >
    {children}

  </div>
}

export default WardenChessSquare
