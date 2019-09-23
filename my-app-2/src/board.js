import React, { Component } from 'react';
import './App.css';
import Square from './square';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick = (i) => {
    const { xIsNext } = this.state;
    const newSquares= [...this.state.squares];

    if (this.calculateGameStatus(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      squares: newSquares,
      xIsNext: !this.state.xIsNext,
    });
  };

  calculateGameStatus = (square) => {
    const { squares } = this.state;

    const lines = [
      [[0, 1, 2], "horizontalTop"],
      [[3, 4, 5], "horizontalAuto"],
      [[6, 7, 8], "horizontalBottom"],
      [[0, 3, 6], "verticalLeft"],
      [[1, 4, 7], "verticalAuto"],
      [[2, 5, 8], "verticalRight"],
      [[0, 4, 8], "crossLeft"],
      [[2, 4, 6], "crossRight"],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [[a, b, c], line]= lines[i];

      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return [square[a], line];
      } else if (!squares.includes(null)) {
        return true;
      }
    }
    return null;
  };

  render() {
    const gameStatus = this.calculateGameStatus(this.state.squares);
    let statusText;

    if(gameStatus){
      if(gameStatus[0]){
        statusText = 'Winner: ' + gameStatus[0];
      } else {
        statusText = 'Beraberlik!'
      }
    } else {
      statusText = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let cardClasses = 'winnerLine ';
    (gameStatus && gameStatus[1] ? cardClasses += gameStatus[1] : cardClasses += "winnerLine-hidden");

    const squareMaps = this.state.squares.map((item, i) =>
      <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />
    )

    return (
      <div className="game-board">
        <div className={cardClasses}></div>
        <div className="game-board__status">{statusText}</div>
        <div className="game-board__board-row">
          {squareMaps}
        </div>
        <button className="button newGame" onClick={() => window.location.reload(false)}>New Game</button>
      </div>
    );
  }
}

export default Board;
