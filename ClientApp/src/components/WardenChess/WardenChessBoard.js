import React from 'react'
import * as Pieces from './WardenChessPieces'
import WardenChessSquare from './WardenChessSquare'
import { GameContext } from './WardenChessGameState'


const WardenChessBoard = props  => {
    const {knightPosition} = React.useContext(GameContext);
    const squareSize='80';

    const renderSquare = (i, [knightX, knightY]) => {
        const x = i % 8
        const y = Math.floor(i/8)
        const isKnightHere = knightX === x && knightY === y
        const piece = isKnightHere ? <Pieces.GrayKnight /> : null
        return (
            <div key={i} style={{ width: squareSize+'px', height: squareSize+'px'}}>
            <WardenChessSquare x={x} y={y}>{piece}</WardenChessSquare>
            </div>
        )
    }    

    const squares = []
    for (let i = 0; i < 64; i++) {
      squares.push(renderSquare(i,knightPosition))
    }
    return (
        <div
            style={{
                width: squareSize*8+'px',
                height: squareSize*8+'px',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
            { squares }
            </div>
    )
}

export default WardenChessBoard
