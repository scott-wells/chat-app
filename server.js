const express = require('express')
const app = express()

// Load the entire local directory root
app.use(express.static(__dirname))

const messages = [
    { name: 'Steve', message: 'Allen!' },
    { name: 'Al', message: 'Steve!' }
]

// GET request
app.get('/messages', (req, res)=>{
    res.send(messages)
})

// Make server and listen on port 3000
let server = app.listen(3000, () => {
    console.log('Server is running on ', server.address().port)
})