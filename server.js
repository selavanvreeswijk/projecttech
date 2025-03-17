const express = require('express');

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
}

function onquiz(req, res) {
    res.render('quiz');  
}

function onresultaten(req, res) {
    res.render('resultaten');  
}

function onfavorieten(req, res) {
    res.render('favorieten');  
}

function ondetail(req, res) {
    res.render('detail');  
}

