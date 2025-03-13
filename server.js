const express = require('express')
const app = express()

app
    .set('view engine', 'ejs') // stelt EJS in als template engine
    .set('views', 'view') //configureer EJS

app
    .get('/', onhome)
    .listen(8000)

function onhome(req, res){
    res.send('<h1></h1>')
}

