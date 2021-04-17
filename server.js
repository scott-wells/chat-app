const express = require('express')
const app = express()

app.use(express.static(__dirname))

const messages = [
    { name: 'Steve', message: 'Allen!' },
    { name: 'Al', message: 'Steve!' }
]

app.get('/messages', (req, res)=>{
    res.send(messages)
})

let server = app.listen(3000, () => {
    console.log('Server is running on ', server.address().port)
})