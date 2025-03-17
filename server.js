const express = require('./node_modules/express');
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'view') 

app.get('/', onhome)
    .listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
})

function onhome(req, res) {
    res.render('index');  
}

function onhome(req, res) {
    res.render('footer');  
}

function onhome(req, res) {
    res.render('header');  
}