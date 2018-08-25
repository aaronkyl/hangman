import React, { Component } from 'react'
import axios from 'axios'

import PlayArea from '../../components/PlayArea/PlayArea'
import Word from '../../components/Word/Word'
import Letters from '../../components/Letters/Letters'
import Spinner from '../../UI/Spinner/Spinner'

class Hangman extends Component {
  state= {
    letters: {},
    gameLength: 10,
    incorrectGuessesAllowed: 6,
    words: [],
    currentWordIndex: 0,
    currentWordLetters: [],
    currentWordActive: true,
    wordWon: false,
    playerIncorrectGuesses: 0
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
        const wordLetters = this.initializeWord(words[0])
        const letters = this.initializeLetters()
        this.setState({
          words: words,
          currentWordLetters: wordLetters,
          letters: letters
        })
      })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  selectWords = (allWords) => {
    // Selects gameLength-worth of random words from the words reutrned by the API.
    // Randomizing which words are selected since API returns same words in alphabetical
    // order each time it is called
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

  letterGuessHandler = (letter) => {
    const letters = this.state.letters
    let incorrectGuesses = this.state.playerIncorrectGuesses 
    // Update letters tracker to show letter has been guessed
    letters[letter] = true
    // Update current word's letters to show guessed letter if in word
    // and update incorrect guess number if it is not in the word
    const currentWordLetters = this.state.currentWordLetters
    if (currentWordLetters.some(el => el.letter === letter)) {
      currentWordLetters.map(el => {
        if (el.letter === letter) el.guessed = true
        return el
      })
    } else {
      incorrectGuesses += 1
    }    
    this.setState({
      letters: letters,
      currentWordLetters: currentWordLetters,
      playerIncorrectGuesses: incorrectGuesses
    }, () => this.determineWordStatus())
  }

  determineWordStatus = () => {
    if (this.wordLost()) {
      this.setState({currentWordActive: false})
    } else if (this.wordWon()) {
      this.setState({wordWon: true})
    }
  }

  wordLost = () => {
    return this.state.playerIncorrectGuesses === this.state.incorrectGuessesAllowed
  }

  wordWon = () => {
    return !this.state.currentWordLetters.some(el => el.guessed === false)
  }

  render() {
    let message = null
    if  (!this.state.currentWordActive) {
      message = <p>You lost</p>
    } else if (this.state.wordWon) {
      message = <p>You won</p>
    }
    console.log("[Hangman.js] - render()")
    let hangman = (
        <React.Fragment>
          <Letters 
            letters={this.state.letters} 
            clicked={this.letterGuessHandler} 
            selectable={this.state.currentWordActive} />
          <Word letters={this.state.currentWordLetters} />
          {message}
        </React.Fragment>
    )
    return (
      <PlayArea>
        <h1>HANGMAN</h1>
        {this.state.words.length ? hangman : <Spinner />}
      </PlayArea>
    )
  }
}

export default Hangman
