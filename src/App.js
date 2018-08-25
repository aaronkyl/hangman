import React, { Component } from 'react';
import Hangman from './containers/Hangman/Hangman'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Hangman />
      </div>
    );
  }
}

export default App;
