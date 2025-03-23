const express = require('express')
const app = express();

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
    .get('/plant/:plantId', onDetail)


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

async function onResults(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        const cardPlant = plants.map (plant => ({
            img: plant.Img,
            commonName: plant['Common name'],
            id: plant.id
        }))

        res.render('results', { plants: cardPlant }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    } 
    console.log('Server is running on http://localhost:9000/results');
}

async function onFavorites(req, res) {
    try {
        const response = await fetch(allUrl, options);
        const plants = await response.json();

        const cardPlant = plants.map (plant => ({
            img: plant.Img,
            commonName: plant['Common name'],
            id: plant.id
        }))

        res.render('favorites', { plants: cardPlant }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }  
    console.log('Server is running on http://localhost:9000/favorites');
}

async function onDetail(req, res) {
    const plantId = req.params.plantId; //als een gebruiker klikt op een plant uit resultatenlijst, wordt het id hierdoor opgehaald en in de url hieronder geplaatst
    const detailUrl = 'https://house-plants2.p.rapidapi.com/id/${plantId}';

    try {
        const response = await fetch(detailUrl, options);
        const plant = await response.json();

        const detailPlant = {
            category: plant.Categories,
            img: plant.Img,
            commonName: plant['Common name'],
            heightPurchase: plant['Height at purchase'],
            idealLight: plant['Light ideal'],
            id: plant.id,
            growth: plant.Growth,
            heightPotential: plant['Height potential'],
            tempMax: plant['Temperature max'],
            watering: plant.Watering
        }

        console.log(detailPlant)

        res.render('detail', { plant: detailPlant }); //stuur de data van de api naar ejs bestand
    
    } catch (error) {
        console.error("Fout bij ophalen API:", error);
    }  
    console.log('Server is running on http://localhost:9000/detail');
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