const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // quiz 

require('dotenv/config');

//API variabelen die te gebruiken zijn:
const apiKey = process.env.API_KEY
const allUrl = 'https://house-plants2.p.rapidapi.com/all';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'house-plants2.p.rapidapi.com'
    }
};


//EJS
app.set('view engine', 'ejs')
app.set('views', 'views') 
app.use(express.static('static')); // voor afbeeldingen

app
    .get('/', onHome)
    .get('/quiz', onQuiz)
    .get('/favorites', onFavorites)
    .get('/results', onResults)
    .get('/log-in', onLogIn)
    .get('/register', onRegister)
    // .get('/details', onDetails)
    .get('/details/:id', onDetails)


    .listen(9000, () => {
        console.log('Server is running on http://localhost:9000');
})

async function onHome(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        res.render('index', { plants: plants }); //stuur de data van de api naar ejs bestand

    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }
    
    console.log('Server is running on http://localhost:9000');
}

// -------------------------quiz---------------------------------

async function onQuiz(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        res.render('quiz', { plants: plants }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }
    
    console.log('Server is running on http://localhost:9000/quiz');
}

app.use(express.static('public')); // quiz test
app.use(bodyParser.json()); // quiz test

let userAnswers = {}; // quiz test

app.post('/save-answer', (req, res) => { // quiz test
    const { questionId, answer } = req.body;
    userAnswers[questionId] = answer;
    res.json({ success: true });
}); 

// -------------------------quiz---------------------------------

async function onResults(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        res.render('results', { plants: plants }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    } 
    console.log('Server is running on http://localhost:9000/results'); 
}

async function onFavorites(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        res.render('favorites', { plants: plants }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }  
    console.log('Server is running on http://localhost:9000/favorites');
}


async function onLogIn(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        res.render('log-in', { plants: plants }); //stuur de data van de api naar ejs bestand
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }
    
    console.log('Server is running on http://localhost:9000/log-in');
}


async function onRegister(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        res.render('register', { plants: plants }); //stuur de data van de api naar ejs bestand
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }
    
    console.log('Server is running on http://localhost:9000/register');
}

async function onDetails(req, res) {
    const plantId = req.params.id; // Haal de plant-ID op uit de URL
    const detailUrl = `https://house-plants2.p.rapidapi.com/id/${plantID}`;

    try {
        const response = await fetch(detailUrl, options);
        const plant = await response.json();

        if (!plant) {
            return res.status(404).send("Could not find plant");
        }

        res.render('details', { plant }); //stuur de data van de api naar ejs bestand

    } catch (error) {
        console.error("Error with API:", error);
        res.status(500).send("An error has occurred.");
    }

    console.log('Server is running on http://localhost:9000/details');
}


// checken of API werkt, hij laat ALLE planten zien:
async function checkAPI(url, options){
    try {
        const response = await fetch(allUrl, options);
        const result = await response.json();
    
    // haal de '//' weg als je alle planten wilt zien   
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// checkAPI(allUrl, options)

