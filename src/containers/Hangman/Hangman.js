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
    gameLength: 5,
    incorrectGuessesAllowed: 6,
    words: [],
    currentWordIndex: 0,
    currentWordLetters: [],
    currentWordActive: true,
    wordWon: false,
    wordLost: false,
    playerIncorrectGuesses: 0,
    score: 0
  }

  componentDidMount() {
    const difficulty = this.props.location.state.difficulty > 0 ? '?difficulty=' + this.props.location.state.difficulty : ''
    const user = this.props.location.state.username ? this.props.location.state.username : 'Jane Smith'
    axios.get('/api/words' + difficulty)
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
        const letters = this.initializeLetters(wordLetters)
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

  initializeLetters = (nextWordLetters) => {
    let letters = {
      'A': {guessed: false, inWord: false},
      'B': {guessed: false, inWord: false},
      'C': {guessed: false, inWord: false},
      'D': {guessed: false, inWord: false},
      'E': {guessed: false, inWord: false},
      'F': {guessed: false, inWord: false},
      'G': {guessed: false, inWord: false},
      'H': {guessed: false, inWord: false},
      'I': {guessed: false, inWord: false},
      'J': {guessed: false, inWord: false},
      'K': {guessed: false, inWord: false},
      'L': {guessed: false, inWord: false},
      'M': {guessed: false, inWord: false},
      'N': {guessed: false, inWord: false},
      'O': {guessed: false, inWord: false},
      'P': {guessed: false, inWord: false},
      'Q': {guessed: false, inWord: false},
      'R': {guessed: false, inWord: false},
      'S': {guessed: false, inWord: false},
      'T': {guessed: false, inWord: false},
      'U': {guessed: false, inWord: false},
      'V': {guessed: false, inWord: false},
      'W': {guessed: false, inWord: false},
      'X': {guessed: false, inWord: false},
      'Y': {guessed: false, inWord: false},
      'Z': {guessed: false, inWord: false}
    }
    for (let i = 0, l = nextWordLetters.length; i < l; i++) {
      console.log(letters)
      const currentLetter = nextWordLetters[i].letter
      letters[currentLetter].inWord = true
    }
    return letters
  }

  letterGuessHandler = (letter) => {
    const letters = this.state.letters
    let incorrectGuesses = this.state.playerIncorrectGuesses 
    let score = this.state.score
    // Update letters tracker to show letter has been guessed
    letters[letter].guessed = true
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
      score += 1
    }    
    this.setState({
      letters: letters,
      currentWordLetters: currentWordLetters,
      playerIncorrectGuesses: incorrectGuesses,
      score: score
    }, () => this.determineWordStatus())
  }

  determineWordStatus = () => {
    if (this.wordLost()) {
      this.setState({
        currentWordActive: false,
        wordLost: true
      })
    } else if (this.wordWon()) {
      this.setState({
        currentWordActive: false,
        wordWon: true
      })
    }
  }

  gameOver = () => {
    return this.state.currentWordIndex + 1 === this.state.gameLength
  }

  wordLost = () => {
    return this.state.playerIncorrectGuesses === this.state.incorrectGuessesAllowed
  }

  wordWon = () => {
    return !this.state.currentWordLetters.some(el => el.guessed === false)
  }

  nextWord = () => {
    const nextWordIndex = this.state.currentWordIndex + 1
    const nextWordLetters = this.initializeWord(this.state.words[nextWordIndex])
    const letters = this.initializeLetters(nextWordLetters)
    this.setState({
      letters: letters,
      currentWordIndex: nextWordIndex,
      currentWordLetters: nextWordLetters,
      currentWordActive: true,
      wordWon: false,
      wordLost: false,
      playerIncorrectGuesses: 0
    })
  }

  submitScore = () => {
    const scoreData = {
      user: this.state.user.toUpperCase(),
      score: this.state.score
    }

    axios.post('https://snowmansaver-fe545.firebaseio.com/scores.json', scoreData)
      .then(response => {
        this.props.history.replace({
          pathname: '/scores'
        })
      })
  }

  render() {
    const buttonClickAction = this.gameOver() ? this.submitScore : this.nextWord
    const buttonWording = this.gameOver() ? "SUBMIT SCORE" : "NEXT WORD"
    const selectLetterOrButton = (!this.state.currentWordActive || this.state.wordWon 
      ? <Button 
          status={!this.state.currentWordActive || this.state.wordWon} 
          clicked={buttonClickAction}>{buttonWording}</Button> 
      : <p className={classes.SelectLetter}>SELECT A LETTER!</p>
    )

    const hangman = (
      <React.Fragment>
        <Graphic 
          incorrectGuesses={this.state.playerIncorrectGuesses}
          incorrectGuessesAllowed={this.state.incorrectGuessesAllowed} 
          currentWordActive={this.state.currentWordActive}
          wordWon={this.state.wordWon}
          wordLost={this.state.wordLost}
          user={this.state.user}
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
