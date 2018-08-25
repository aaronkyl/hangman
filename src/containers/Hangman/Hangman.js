import React, { Component } from 'react'
import axios from 'axios'

import Word from '../../components/Word/Word'

class Hangman extends Component {
  state= {
    words: [],
    currentWordIndex: 0,
    currentWordLetters: [],
    gameLength: 10
  }

  componentDidMount() {
    console.log("[Hangman.js] - componentDidMount()")
    axios.get('http://app.linkedin-reach.io/words')
      .then(response => {
        // response.data is a newline separated string
        return response.data.split("\n")
      })
      .then(allWords => {
        const words = this.selectWords(allWords)
        return words
      })
      .then(words => {
        const splitWord = this.initializeWord(words[0])
        this.setState({
          words: words,
          currentWordLetters: splitWord
        })
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  selectWords = (allWords) => {
    const words = []
    for (let i = 0, l = allWords.length; i < this.state.gameLength; i++) {
      words.push(allWords[Math.floor(Math.random() * l)])
    }
    return words
  }

  initializeWord = (word) => {
    let splitWord = word.split('')
    splitWord = splitWord.map(letter => {
      return {letter: letter, guessed: false}
    })
    return splitWord
  }

  render() {
    console.log("[Hangman.js] - render()")
    return (
      <React.Fragment>
        <h1>HANGMAN</h1>
        <p>div of letters</p>
        <Word letters={this.state.currentWordLetters} />
      </React.Fragment>
    )
  }
}

export default Hangman
