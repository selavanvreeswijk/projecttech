const express = require('express');

const app = express();


app.set('view engine', 'ejs')
app.set('views', 'view') 






app.get('/', onhome)
    .listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
  
    .get('/quiz', onquiz)
    .get('/favorieten', onfavorieten)
    .get('/resultaten', onresultaten)
    .get('/detail', ondetail)
})

function onhome(req, res) {
    res.render('index');  
}

