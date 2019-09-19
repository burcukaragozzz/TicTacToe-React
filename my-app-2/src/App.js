import React, { Component } from 'react';
import './App.css';
import Board from './board';

class App extends Component {
  render() {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}

export default App;
