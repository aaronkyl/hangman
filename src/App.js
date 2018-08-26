import React, { Component } from 'react';
import Hangman from './containers/Hangman/Hangman'
import Aux from './hoc/Aux'
import './App.css';

class App extends Component {
  render() {
    return (
      <Aux>
        <Hangman />
      </Aux>
    );
  }
}

export default App;
