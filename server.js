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
    .listen(8000)

function onhome(req, res){
    res.send('<h1>Welkom bij de plantenmatch</h1>')

}
function onquiz(req, res){
    res.send('<h1>Welkom bij de quiz</h1>')
    
}
function onfavorieten(req, res){
    res.send('<h1>Welkom bij jouw favorieten</h1>')
    
}
function onresultaten(req, res){
    res.send('<h1>Welkom bij jouw resultaten</h1>')
    
}
function onhome(req, res){
    res.send('<h1>Welkom bij de detailpagina</h1>')
    
}

