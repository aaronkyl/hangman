import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Hangman from './containers/Hangman/Hangman'
import LandingPage from './containers/LandingPage/LandingPage'
import CodedBy from './components/CodedBy/CodedBy'

import classes from './App.css'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Link to="/" className={classes.Link}><h1 className={classes.H1}>SNOWMAN SAVER</h1></Link>
        <div className={classes.GroundDiv}></div>
        <Switch>
          <Route path='/' exact render={() => <LandingPage beginGame={this.beginGameHandler} />} />
          <Route path='/game' exact component={Hangman} />
        </Switch>
        <CodedBy />
      </div>
    );
  }
}

export default App;
