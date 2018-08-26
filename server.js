const express = require('express')        //Express to run our app
const app = express()                     //Initiate the app
const bodyParser = require('body-parser') //Parse JSON requests
const path = require('path')              //Navigate to build folder
const axios = require('axios')

// instruct Express to serve the files in the build folder
app.use(express.static(path.join(__dirname, 'build')))
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
// })

//API get request before serving React
app.get('/api/getWords', (req, res) => {
  console.log('api')
  const difficulty = req.query.difficulty > 0 ? '?difficulty=' + req.query.difficulty : ''
  axios.get('https://app.linkedin-reach.io/words' + difficulty)
    .then(response => {
      res.send(response.data)
    })
});

// default to send all unknown requests a copy of our React app
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
 });

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Listening on port', port)
});