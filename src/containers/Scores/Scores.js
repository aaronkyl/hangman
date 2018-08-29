import React, { Component } from 'react'
import Score from './Score/Score'
import axios from 'axios'
import classes from './Scores.css'

class Scores extends Component {
  state = {
    scores: []
  }

  componentDidMount() {
    axios.get('https://snowmansaver-fe545.firebaseio.com/scores.json')
      .then(response => {
        this.sortScores(response.data)
      })
  }

  sortScores = (rawScores) => {
    const scores = Object.keys(rawScores)
      .map(key => rawScores[key])
      .sort((a, b) => a.score - b.score)
    this.setState({scores: scores})
  }

  render() {
    const scores = this.state.scores.map((score, index) => {
      return <Score user={score.user} score={score.score} key={index} />
    })
    return (
      <div className={classes.Scores}>
        <h2>Least incorrect guesses wins!</h2>
        <table className={classes.Table}>
          <thead className={classes.THead}>
            <h3>NAME</h3>
            <h3>SCORE</h3>
          </thead>
          <tbody className={classes.TBody}>
            {scores}
          </tbody>
        </table>
      </div>  
    )
  }
}

export default Scores