const express = require('express')
const app = express()

// Load the entire local directory root
app.use(express.static(__dirname))

// use json and urlencoded parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// temp data
const messages = [
    { name: 'Steve', message: 'Allen!' },
    { name: 'Al', message: 'Steve!' }
]

// GET request
app.get('/messages', (req, res)=>{
    res.send(messages)
})
 
// POST request - for POST requests, use Postman app
app.post('/messages', (req, res)=>{
    console.log(req.body) // test the POST request
    messages.push(req.body)
    res.sendStatus(200)
})

// Make server and listen on port 3000
let server = app.listen(3000, () => {
    console.log('Server is running on ', server.address().port)
})