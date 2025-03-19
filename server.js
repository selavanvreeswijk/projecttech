
// const express = require('express'); --werkt niet omdat we een ES module hebben?
import express from 'express';
const app = express();

//require('dotenv').config(); --werkt niet omdat we een ES module hebben?
import 'dotenv/config';


app.set('view engine', 'ejs')
app.set('views', 'views') 
app.use(express.static('static')); // voor afbeeldingen

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

//API variabelen die te gebruiken zijn:
const apiKey = process.env.API_KEY
const url = 'https://house-plants2.p.rapidapi.com/all-lite';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'house-plants2.p.rapidapi.com'
    }
};

// checken of API werkt:
try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
} catch (error) {
    console.error(error);
}