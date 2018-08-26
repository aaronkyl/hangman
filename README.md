# Snowman Saver
Hangman game built with React

## Installation


## Wireframe
Preview with notes: https://wireframe.cc/PuHQGE

![desktop mockup](docs/img/mockup_desktop.png)

## Basic Requirements
- [X] Computer selects a secret word
- [X] User is shown the number of letters in the word (underscores)
- [X] User guesses one letter at a time
- [X] User has 6 guesses before they lose
- [X] The number of remaining guesses is displayed
- [X] Correct guesses result in letter appearing in the word blank
- [X] Incorrect guesses are displayed in a list (greyed out)

## Stretch Goals
- [X] Graphic showing new parts of the body as incorrect guesses are made
- [X] Landing page to record username
- [X] Ability to select difficulty on landing page
- [ ] Record number of incorrect guesses and username (lower = better)
- [ ] After last word, display modal showing score and ask if the user wants to play again
- [ ] List of high scores

## Project Review
### Things I learned in this project
- This was my first experience with CORS issues and it led to a better understanding of basic server security and forced me to create my first React/Express app. My previous React app made no external API calls and so I easily hosted it on Firebase.
- Credit where credit is due - [this article](https://medium.com/byte-sized-react/hosting-react-and-a-rest-api-with-express-28f7ba5a4cc4) was very helpful in explaining the basics of connecting my React files to my Express server.

### Issues faced during this project
- The word-providing API I was instructed to use caused a "No 'Access-Control-Allow-Origin' header is present on the requested resource." error in my browser when I attempted to access it from my localhost. I downloaded a Chrome extension to bypass this, thinking I would not have this problem once I deployed to Firebase. Same issue occurred. I created a simple Express server to act as a middleman to get around this. 