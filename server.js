require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

// Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static', {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')){
      res.setHeader('Content-Type', 'text/css');
    }
  }
})); // Voor afbeeldingen en bestaande project
//juist MIME-type forceren
app.use(express.static('public')); // Voor extra statische bestanden zoals quiz
app.use(bodyParser.json());

// Sessions
app.use(session({
  secret: 'a3d7f8b9c10e2f4d5a6b7c8d9e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1800000 }
}));

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log ('Logout failed:', err)
      return res.redirect('/profile'); // Of toon een error
    }
  })
  return res.redirect ('/log-in')
})

// MongoDB setup
const client = new MongoClient(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
let db;

client.connect()
  .then(() => {
    console.log('✅ Connected with MongoDB');
    db = client.db(process.env.DB_NAME);
  })
  .catch(err => console.log('❌ Database error:', err));

// API setup
const apiKey = process.env.API_KEY;
const allUrl = 'https://house-plants2.p.rapidapi.com/all';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'house-plants2.p.rapidapi.com'
  }
};

let userAnswers = {};
let cachedPlants = [];

async function updatePlantsCache() {
    try {
        const response = await fetch(allUrl, options);
        const data = await response.json();

        cachedPlants = data;

    } catch (error) {
        console.error("Error while retrieving plants:", error);
    }
}

updatePlantsCache(); //alle planten worden meteen ingeladen en niet pas bij klikken op pagina
setInterval(updatePlantsCache, 30 * 60 * 1000); // elke 30 min api vernieuwen

// API-endpoint om de gecachede planten op te vragen
app.get('/api/plants', (req, res) =>{
  res.json(cachedPlants);
});

app
  .get('/', onHome)
  .get('/quiz', onQuiz)
  .get('/favorites', onFavorites)
  .get('/results', onResults)
  .get('/plant/:plantId', onDetail)
  .get('/log-in', onLogIn)
  .get('/register', onRegister)
  .get('/profile', onDashboard)
  .get('/change-password', onChangePassword)

  .post('/log-in', onLoginPost)
  .post('/check-username', userCheck)
  .post('/register', onRegisterPost)
  .post('/save-answer', onSaveAnswer)
  .listen(process.env.PORT || 9000, () => {
    console.log(`Server is runnning on http://localhost:${process.env.PORT || 9000}`);
  });



async function onHome(req, res) {
  try {
    res.render('index', { plants: cachedPlants });
  } catch (error) {
    console.error("Error with API:", error);
  }
}

async function onQuiz(req, res) {
  try {
    res.render('quiz', { plants: cachedPlants });
  } catch (error) {
    console.error("Error with API:", error);
  }
}

async function onFavorites(req, res) {
  if (!req.session.user) {
    return res.redirect('/log-in');
  }

  const userId = req.session.user._id;

  try {
    const userObjectId = ObjectId.createFromHexString(userId);
    const user = await db.collection('users').findOne({ _id: userObjectId });

    if (!user || !user.favplant || user.favplant.length === 0) {
      return res.render('favorites', { plants: [] });
    }

    const favoritePlantIds = user.favplant; 
    const favoritePlants = [];

    for (const plantId of favoritePlantIds) {
      const foundPlant = cachedPlants.find(plant => plant.id === plantId);
      if (foundPlant) {
        favoritePlants.push(foundPlant)
      }
    }
    res.render('favorites', { plants: favoritePlants });
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    res.status(500).send("Something went wrong");
  }

}

async function onResults(req, res) {
  try {
    res.render('results', { plants: cachedPlants });
  } catch (error) {
    console.error("Error with API:", error);
  }
}

async function onDetail(req, res) {
  const plantId = req.params.plantId;
  const detailUrl = `https://house-plants2.p.rapidapi.com/id/${plantId}`;
  try {
    const response = await fetch(detailUrl, options);
    const plants = await response.json();
    const detailPlant = {
      category: plants.Categories,
      img: plants.Img,
      commonName: plants['Common name'],
      heightPurchase: plants['Height at purchase'],
      idealLight: plants['Light ideal'],
      id: plants.id,
      growth: plants.Growth,
      tempMax: plants['Temperature max'],
      watering: plants.Watering,
      use: plants.Use,
      colorOfLeaf: plants['Color of leaf'],
      minTemp: plants['Temperature min'],
    };
    res.render('details', { plants: detailPlant });
  } catch (error) {
    console.error("Error with API", error);
  }
}

async function onLogIn(req, res) {
  res.render('log-in');
}

async function onRegister(req, res) {
  res.render('register');
}

async function onChangePassword(req, res){
    res.render('change-password')
}

async function onDashboard(req, res) {
  if (!req.session.user) {
    return res.redirect('/log-in');
  }
  res.render('dashboard', { username: req.session.user.username });
}

async function onLoginPost(req, res) {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username: username });
  
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { 
      _id: user._id,
      username: user.username 
    };
    return res.json({success: true, redirect: "/profile"});
  }
  res.status(401).json({success: false, message: "Invalid username or password"})
}

async function userCheck(req, res) {
  const { username } = req.body;
  if(!username) {
    return res.status(400).json({ success: false,  message: "Username is required"})
  }

  const existingUser = await db.collection("users").findOne({username});
  res.json({ exists: !!existingUser })
}

async function onRegisterPost(req, res) {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({success: false, message: 'Passwords do not match' });
  }

  const existingUser = await db.collection("users").findOne({username});
  if (existingUser){
    return res.status(400).json({success: false })
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ username, password: hashedPassword, favplant: [] });
  res.json({success: true, redirect: '/log-in'});
}

function onSaveAnswer(req, res) {
  const { questionId, answer } = req.body;
  userAnswers[questionId] = answer;
  res.json({ success: true });
}

// Optional API check
async function checkAPI(url, options) {
  try {
    const response = await fetch(allUrl, options);
    const result = await response.json();
   // console.log(result); // uncomment voor debuggen

  } catch (error) {
    console.error(error);
  }
}

//add to fav
app.post('/add-favorite', async (req, res) => {
  if (!req.session.user) { // checken of gebruiker is ingelogd
    return res.status(401).json({ succes: false, message: 'You need to be logged in to add favorites'})
  }

  const userId = req.session.user._id;
  const { plantId } = req.body;

  try {
    const userObjectId = ObjectId.createFromHexString(userId);
    const user = await db.collection('users').findOne({ _id: userObjectId });

    if(!user) {
      return res.status(404).json({ success: false, message: "No user found"})
    }

    if(user.favplant.includes(plantId)) {
      await db.collection('users').updateOne(
        { _id:userObjectId},
        { $pull: {favplant: plantId}}
      );
      return res.json({ success: true, message:"Plant removed from your favorites!"})
    }

    await db.collection('users').updateOne(
      { _id:userObjectId},
      { $push: {favplant: plantId}}
    );

    res.json({success: true, message:"Plant added to favorites!"})
  } catch (error) {
    console.error("Error with adding to favorites:", error);
  }
})
