import React, { Component } from 'react'

import Button from '../../UI/Button/Button'

import classes from './LandingPage.css'

class LandingPage extends Component {
  state = {
    username: '',
    difficulty: 0
  }

  usernameHandler = (username) => {
    this.setState({username: username})
  }

  difficultyHandler = (difficulty) => {
    this.setState({difficulty: difficulty})
  }

  render() {
    console.log("[LandingPage.js] - render()")
    return (
      <div className={classes.LandingPage}>
        <p className={classes.P}>Enter your name and select a difficulty to begin!</p>
        <p className={classes.Label}>USERNAME</p>
        <input className={classes.Username} type="text" value={this.state.username} onChange={(e) => this.usernameHandler(e.target.value)} />
        <p className={classes.Label}>DIFFICULTY</p>
        <div className={classes.DifficultyDiv}>
          <p>EASY</p>
          <input className={classes.Difficulty} type="range" min="1" max="10" value={this.state.difficulty} onChange={(e) => this.difficultyHandler(e.target.value)}></input>
          <p>DIFFICULT</p>
        </div>
        <Button 
          status={this.state.username.length > 0}
          >BEGIN GAME</Button>
      </div>
    )
  }
}

export default LandingPage