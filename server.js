const express = require('express');
const app = express();

app
    .set('view engine', 'ejs') // stelt EJS in als template engine
    .set('views', 'view') //configureer EJS

app
    .get('/', onhome)
    .get('/quiz', onquiz)
    .get('/favorieten', onfavorieten)
    .get('/resultaten', onresultaten)
    .get('/detail', ondetail)

    .listen(9000)

function onhome(req, res){
    res.render('index')

}
