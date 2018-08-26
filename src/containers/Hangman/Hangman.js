import React, { Component } from 'react'
import axios from 'axios'

import PlayArea from '../../components/PlayArea/PlayArea'
import Word from '../../components/Word/Word'
import Letters from '../../components/Letters/Letters'
import Graphic from '../../components/Graphic/Graphic'

import Spinner from '../../UI/Spinner/Spinner'
import Button from '../../UI/Button/Button'

import classes from './Hangman.css'

class Hangman extends Component {
  state= {
    user: null,
    gameDifficulty: null,
    letters: {},
    gameLength: 10,
    incorrectGuessesAllowed: 6,
    gameOver: false,
    words: [],
    currentWordIndex: 0,
    currentWordLetters: [],
    currentWordActive: true,
    wordWon: false,
    playerIncorrectGuesses: 0
  }

  componentDidMount() {
    console.log("[Hangman.js] - componentDidMount()")
    const difficulty = this.props.location.state.difficulty > 0 ? '?difficulty=' + this.props.location.state.difficulty : ''
    const user = this.props.location.state.username ? this.props.location.state.username : 'Jane Smith'
    axios.get('http://app.linkedin-reach.io/words' + difficulty)
      .then(response => {
        // response.data is a newline separated string
        return response.data.split("\n")
      })
      .then(allWords => {
        const words = this.selectWords(allWords)
        return words
      })
      .then(words => {
        const wordLetters = this.initializeWord(words[this.state.currentWordIndex])
        const letters = this.initializeLetters()
        this.setState({
          user: user,
          gameDifficulty: difficulty,
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
      this.setState({
        currentWordActive: false,
      })
    } else if (this.wordWon()) {
      this.setState({
        currentWordActive: false,
        wordWon: true
      })
    }
  }

  wordLost = () => {
    return this.state.playerIncorrectGuesses === this.state.incorrectGuessesAllowed
  }

  wordWon = () => {
    return !this.state.currentWordLetters.some(el => el.guessed === false)
  }

  nextWord = () => {
    if (!this.state.gameOver) {
      const nextWordIndex = this.state.currentWordIndex + 1
      const letters = this.initializeLetters()
      const nextWordLetters = this.initializeWord(this.state.words[nextWordIndex])
      this.setState({
        letters: letters,
        currentWordIndex: nextWordIndex,
        currentWordLetters: nextWordLetters,
        currentWordActive: true,
        wordWon: false,
        playerIncorrectGuesses: 0
      })
    } else {
      this.state({gameOver: true})
    }
  }

  render() {
    console.log("[Hangman.js] - render()")

    const selectLetterOrButton = (!this.state.currentWordActive || this.state.wordWon 
      ? <Button 
          status={!this.state.currentWordActive || this.state.wordWon} 
          clicked={this.nextWord}>NEXT WORD</Button> 
      : <p className={classes.SelectLetter}>SELECT A LETTER!</p>
    )

    const hangman = (
      <React.Fragment>
        <Graphic 
          incorrectGuesses={this.state.playerIncorrectGuesses}
          incorrectGuessesAllowed={this.state.incorrectGuessesAllowed} 
          currentWordActive={this.state.currentWordActive}
          wordWon={this.state.wordWon}
        />
        <Letters 
          letters={this.state.letters} 
          clicked={this.letterGuessHandler} 
          selectable={this.state.currentWordActive} 
        />
        <Word 
          letters={this.state.currentWordLetters} 
          wordActive={this.state.currentWordActive}
        />
        {selectLetterOrButton}
      </React.Fragment>
    )

    return (
      <div className={classes.Hangman}>
        <div className={classes.GroundDiv}></div>
        <PlayArea>
          {this.state.words.length ? hangman : <Spinner />}
        </PlayArea>
      </div>
    )
  }
}

export default Hangman
