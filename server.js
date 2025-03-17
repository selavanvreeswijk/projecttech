
// const express = require('express');
import express from 'express'

const app = express();


app.set('view engine', 'ejs')
app.set('views', 'view') 


app.get('/', onhome)

    .get('/quiz', onquiz)
    .get('/favorieten', onfavorieten)
    .get('/resultaten', onresultaten)
    .get('/detail', ondetail)


    .listen(9000, () => {
        console.log('Server is running on http://localhost:9000');
      

})

function onhome(req, res) {
    res.render('index');  
    console.log('Server is running on http://localhost:9000');
}

function onquiz(req, res) {
    res.render('quiz');  
    console.log('Server is running on http://localhost:9000/quiz');
}

function onresultaten(req, res) {
    res.render('resultaten'); 
    console.log('Server is running on http://localhost:9000/resultaten'); 
}

function onfavorieten(req, res) {
    res.render('favorieten');  
    console.log('Server is running on http://localhost:9000/favorieten');
}

function ondetail(req, res) {
    res.render('detail');  
    console.log('Server is running on http://localhost:9000/detail');
}


