


const express = require('express')
const app = express();

require('dotenv/config');


app.set('view engine', 'ejs')
app.set('views', 'views') 
app.use(express.static('static')); // voor afbeeldingen

app.get('/', onHome)

    .get('/quiz', onQuiz)
    .get('/favorieten', onFavorieten)
    .get('/resultaten', onResultaten)
    .get('/detail', onDetail)

    .listen(9000, () => {
        console.log('Server is running on http://localhost:9000');
})

async function onHome(req, res) {
    try {
        const response = await fetch(url, options);
        const plants = await response.json();

        res.render('index', { plants: plants }); //stuur de data van de api naar ejs bestand

    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }
    
     
    console.log('Server is running on http://localhost:9000');
}

async function onQuiz(req, res) {
    try {
        const response = await fetch(url, options);
        const plants = await response.json();

        res.render('quiz', { plants: plants }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }
    
    console.log('Server is running on http://localhost:9000/quiz');
}

async function onResultaten(req, res) {
    try {
        const response = await fetch(url, options);
        const plants = await response.json();

        res.render('resultaten', { plants: plants }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    } 
    console.log('Server is running on http://localhost:9000/resultaten'); 
}

async function onFavorieten(req, res) {
    try {
        const response = await fetch(url, options);
        const plants = await response.json();

        res.render('favorieten', { plants: plants }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }  
    console.log('Server is running on http://localhost:9000/favorieten');
}

async function onDetail(req, res) {
    try {
        const response = await fetch(url, options);
        const plants = await response.json();

        res.render('detail', { plants: plants }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }  
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

// checken of API werkt, hij laat ALLE planten zien:
async function checkAPI(url, options){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
    
    // haal de '//' weg als je alle planten wilt zien   
        // console.log(result);
    } catch (error) {
        console.error(error);
    }
}

checkAPI(url, options)