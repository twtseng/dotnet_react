import React from 'react'

import './WardenChess.css';

import WardenChessBoard from './WardenChessBoard';
import { Game } from './WardenChessGameState';

const WardenChess = () => {
    return (
      <Game>
        <WardenChessBoard  />
      </Game>
    );
}

export default WardenChess
