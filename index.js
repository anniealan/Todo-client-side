const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = 8080
const app = express()
const router = require('./router')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser. json())

app.use(express.static('public'))

app.get('/', (req, res)=>{

    res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.use('/api', router)

app.listen(PORT, ()=>{
    console.log(`listens on port ${PORT}`)
})
