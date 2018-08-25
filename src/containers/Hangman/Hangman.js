import React, { Component } from 'react'
import axios from 'axios'

import Word from '../../components/Word/Word'
import Letters from '../../components/Letters/Letters'
import Spinner from '../../UI/Spinner/Spinner'

class Hangman extends Component {
  state= {
    words: [],
    currentWordIndex: 0,
    currentWordLetters: [],
    letters: {},
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
        const letters = this.initializeLetters()
        this.setState({
          words: words,
          currentWordLetters: splitWord,
          letters: letters
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
      return {letter: letter.toUpperCase(), guessed: false}
    })
    return splitWord
  }

  initializeLetters = () => {
    const letters = {
      'A': false,
      'B': false,
      'C': false,
      'D': false,
      'E': false,
      'F': false,
      'G': false,
      'H': false,
      'I': false,
      'J': false,
      'K': false,
      'L': false,
      'M': false,
      'N': false,
      'O': false,
      'P': false,
      'Q': false,
      'R': false,
      'S': false,
      'T': false,
      'U': false,
      'V': false,
      'W': false,
      'X': false,
      'Y': false,
      'Z': false
    }
    return letters
  }

  render() {
    console.log("[Hangman.js] - render()")
    let hangman = (
        <React.Fragment>
          <Letters letters={this.state.letters} />
          <Word letters={this.state.currentWordLetters} />
        </React.Fragment>
    )
    return (
      <React.Fragment>
        <h1>HANGMAN</h1>
        {this.state.words.length ? hangman : <Spinner />}
      </React.Fragment>
    )
  }
}

export default Hangman
