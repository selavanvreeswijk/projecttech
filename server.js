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
app.use(express.static('static')); // Voor afbeeldingen en bestaande project
app.use(express.static('public')); // Voor extra statische bestanden zoals quiz
app.use(bodyParser.json());

// Sessions
app.use(session({
  secret: 'a3d7f8b9c10e2f4d5a6b7c8d9e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1800000 }
}));

// MongoDB setup
const client = new MongoClient(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
let db;

client.connect()
  .then(() => {
    console.log('✅ Verbonden met MongoDB');
    db = client.db(process.env.DB_NAME);
  })
  .catch(err => console.log('❌ Database fout:', err));

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

app
  .get('/', onHome)
  .get('/quiz', onQuiz)
  .get('/favorites', onFavorites)
  .get('/results', onResults)
  .get('/plant/:plantId', onDetail)
  .get('/log-in', onLogIn)
  .get('/register', onRegister)
  .get('/dashboard', onDashboard)
  .post('/log-in', onLoginPost)
  .post('/register', onRegisterPost)
  .post('/save-answer', onSaveAnswer)
  .listen(process.env.PORT || 9000, () => {
    console.log(`Server draait op http://localhost:${process.env.PORT || 9000}`);
  });

async function onHome(req, res) {
  try {
    const response = await fetch(allUrl, options);
    const plants = await response.json();
    res.render('index', { plants });
  } catch (error) {
    console.error("Fout bij ophalen API:", error);
  }
}

async function onQuiz(req, res) {
  try {
    const response = await fetch(allUrl, options);
    const plants = await response.json();
    res.render('quiz', { plants });
  } catch (error) {
    console.error("Fout bij ophalen API:", error);
  }
}

async function onFavorites(req, res) {
  try {
    const response = await fetch(allUrl, options);
    const plants = await response.json();
    res.render('favorites', { plants });
  } catch (error) {
    console.error("Fout bij ophalen API:", error);
  }
}

async function onResults(req, res) {
  try {
    const response = await fetch(allUrl, options);
    const plants = await response.json();
    res.render('results', { plants });
  } catch (error) {
    console.error("Fout bij ophalen API:", error);
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
      heightPotential: plants['Height potential'],
      tempMax: plants['Temperature max'],
      watering: plants.Watering
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

async function onDashboard(req, res) {
  if (!req.session.user) {
    return res.redirect('/log-in');
  }
  res.render('dashboard', { username: req.session.user.username });
}

async function onLoginPost(req, res) {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { username: user.username };
    return res.redirect('/dashboard');
  }
  res.render('error', { 
    message: 'Ongeldige gebruikersnaam of wachtwoord',
    redirect: '/log-in' });
}

async function onRegisterPost(req, res) {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.render('error', { 
        message: 'Wachtwoorden komen niet overeen!',
        redirect: '/register' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ username, password: hashedPassword });
  res.redirect('/log-in');
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
