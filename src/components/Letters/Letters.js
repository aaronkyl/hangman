letterGuessHandler = (letter) => {
  let letters = this.state.letters
  letters = letters.map(el => {
    if (el.letter === letter) {
      el.guessed = true
    }
    return el
  })
  this.setState({letters: letters})
}