# Snowman Saver
Hangman game built with React, Express, Nodejs, and Firebase for the database. FERN stack?

## Installation
1. Download project files
2. In terminal window, cd to project folder
3. Type `npm i` and hit enter to install all dependencies
4. Type `npm run build` and hit enter to compile the game
5. Type `node rungame.js` to load the game
6. Open a browser and go to http://localhost:5000 to play!

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
- [X] Record number of incorrect guesses and username (lower = better)
- [ ] ~~After last word, display modal showing score and ask if the user wants to play again~~
- [X] List of high scores
- [X] After last word, display list of high scores (lower numbers)

## Project Review
### Things I learned in this project
- This was my first experience with CORS issues and it led to a better understanding of basic server security and forced me to create my first React/Express app. I had originally# textplanned to create a frontend-only game since my previous React app, which made no external API calls, was easily hosted on Firebase. Since these CORS issues made this exceedingly difficult I caved and put together a simple Express server to act as a middleman for my API calls.
- Credit where credit is due - [this article](https://medium.com/byte-sized-react/hosting-react-and-a-rest-api-with-express-28f7ba5a4cc4) was very helpful in explaining the basics of connecting my React files to my Express server.
- Gained a firmer grasp of React as a whole. There's still much to learn, but the foundations are stronger now than they were previously.

### Issues faced during this project
- The word-providing API I was instructed to use caused a "No 'Access-Control-Allow-Origin' header is present on the requested resource." error in my browser when I attempted to access it from my localhost. I downloaded a Chrome extension to bypass this, thinking I would not have this problem once I deployed to Firebase. Same issue occurred. I created a simple Express server to act as a middleman to get around this.
- Figuring out how to stop unnecessary re-rendering, which I feel is an issue with any React app in the beginning of its development.