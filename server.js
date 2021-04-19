const express = require('express')
const app = express()
const http = require('http').Server(app)
const socket = require('socket.io')(http)
const mongoose = require('mongoose')
require('dotenv').config()

// Load the entire local directory root
app.use(express.static(__dirname))

// use json and urlencoded parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// mongoose url
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kqcvu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// mongodb schema
const Message = mongoose.model('Message', {
    name: String,
    message: String,
})

// temp data - not needed after database setup
// const messages = [
//     { name: 'Steve', message: 'Allen!' },
//     { name: 'Al', message: 'Steve!' }
// ]

// GET request
app.get('/messages', (req, res)=>{
    // add mongodb .find() once the database is set up - the {} selects anything in the database
    Message.find({}, (err, messages) => {
        res.send(messages) // use this before database setup to get messages from the endpoint
    })
    
})
 
// POST request - for POST requests, use Postman app
app.post('/messages', (req, res)=>{
    console.log(req.body) // test the POST request
    let message = new Message(req.body) // make a new instance of a Message
    
    // save the Message instance to the database
    // send status 500 if err
    // push the message to the webpage body
    // emit the message with socket.io
    // send status 200
    message.save((err) => {
        if(err) { sendStatus(500) }
        // messages.push(req.body) - use this line until the database is set up - it pushes temp data from the messages variable above
        socket.emit('message', req.body)
        res.sendStatus(200)
    })
})

socket.on('connection', (socket)=>{
    console.log('user has connected')
})

// connect to mongodb
mongoose.connect(dbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(()=>console.log('MongoDB connected...'))
.catch(err=>console.log(err))

// Make server and listen on port 3000
// *Note to run the server and socket.io simultaneualsy, you must change app.listen() to http.listen()
let server = http.listen(3000, () => {
    console.log('Server is running on ', server.address().port)
})