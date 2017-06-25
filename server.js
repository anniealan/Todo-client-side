const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const router = require('./router')
const mongoose = require('mongoose')
const fs = require('fs')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/todos')


const PORT = 3000
const app = express()

const cookieParser = require('cookie-parser') 
app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser. json())

app.use(expressValidator())

app.use(express.static('public'))

// executes mongoose model files
fs.readdirSync(path.join(__dirname, '/models'))
    .map(file=>require(path.join(__dirname, `/models/${file}`)))

// creates cookie for user if does not exist
app.use((req, res, next) => {
    
    if(!req.cookies.user_id){
        mongoose.model('User').create({})
            .then(user=>{
                res.cookie('user_id', user._id)
                next()
            })
            .catch(err=>console.log(err))
    } else {
        console.log('cookie exists', req.cookies.user_id);
        next()
    }
})

app.get('/', (req, res)=>{
   
    res.sendFile(path.join(__dirname, '/public/index.html'))

})

app.use('/api', router)

app.listen(PORT, ()=>{
    console.log(`listens on port ${PORT}`)
})
