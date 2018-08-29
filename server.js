const express = require('express')        //Express to run our app
const app = express()                     //Initiate the app
const path = require('path')              //Navigate to build folder
const axios = require('axios')

// instruct Express to serve the files in the build folder
app.use(express.static(path.join(__dirname, 'build')))

// API to get words from words API and avoid CORS issue that occures
// when this external API is queried directly from the React app
app.get('/api/words', (req, res) => {
  const difficulty = req.query.difficulty > 0 ? '?difficulty=' + req.query.difficulty : ''
  axios.get('https://app.linkedin-reach.io/words' + difficulty)
    .then(response => {
      res.send(response.data)
    })
});

// default to send all unknown requests a copy of our React app
app.get('*', (req,res) => {
  // res.sendFile(path.join(__dirname, 'build/index.html'))
  res.sendFile(path.join(__dirname, 'build/index.html'))
 });

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Listening on port', port)
});