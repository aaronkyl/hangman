import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Hangman from './containers/Hangman/Hangman'
import CodedBy from './components/CodedBy/CodedBy'

import classes from './App.css'

class App extends Component {
  state = {
    user: '',
    difficulty: null
  }

  render() {
    return (
      <div className={classes.App}>
        <h1 className={classes.H1}>SNOWMAN SAVER</h1>
        <div className={classes.GroundDiv}></div>
        <Switch>
          <Route path='/' exact component={Hangman} />
        </Switch>
        <CodedBy />
      </div>
    );
  }
}

export default App;
