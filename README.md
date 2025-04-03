# PlantMatch

PlantMatch is a website that allows users to discover plants that perfectly suit their needs and environment. Users can take a quiz, find plants, add them to their favorites list and learn more about them!  The website fetches plant data from an external API and displays it in a structured format for easy exploration.

## API Integration
PlantMatch fetches plant data from the following external API:
https://rapidapi.com/mnai01/api/house-plants2

Make sure to sign up for an API key, subscribe to the ULTRA plan, and store it securely in your .env.

## Installation
To run this project locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://gihub.com/selavanvreeswijk/projecttech.git
   ```
2. Navigate to the project directory:
   ```bash
   cd projecttech
   ```
3. Install the required dependencies:
   ```bash
   npm install
   npm install express express-session mongodb bcryptjs nodemon ejs dotenv cors body-parser bcrypt
   ```
4. Create a .env file in the root of your project with the necessary environment variables:
   ```env
   API_KEY = your_api_key
   PORT=your_port_number
   DB_USERNAME=your_mongo_username
   DB_PASSWORD=your_mongo_password
   DB_HOST=your_mongodb_host
   DB_NAME=your_mongodb_name
   ```
5. Start the server:
   ```bash
   node server.js
   ```
6. Open your browser and go to http://localhost:9000 to see the website in action







ChatGPT zei:
Het schrijven van gedetailleerde documentatie van het prototype betekent dat je een uitgebreide beschrijving maakt van hoe het prototype werkt en hoe het verder ontwikkeld kan worden. Dit is belangrijk voor ontwikkelaars, ontwerpers en andere betrokkenen, zodat ze precies weten wat het prototype doet, hoe het is opgebouwd en hoe het verbeterd of uitgebreid kan worden.

Wat moet erin staan?
Overzicht van het prototype

Wat is het doel?

Voor wie is het bedoeld?

Welke problemen lost het op?

Functionele specificaties

Welke functies bevat het prototype? (bijv. login, zoekfunctie, filters)

Hoe werken deze functies?

Interactie- en UI-richtlijnen

Welke schermen/pagina’s zijn er en hoe navigeren gebruikers ertussen?

Welke ontwerpprincipes zijn toegepast (bijvoorbeeld kleurgebruik, typografie, iconen)?

Technische specificaties

Welke technologieën zijn gebruikt? (bijv. HTML, CSS, JavaScript, frameworks)

Hoe is de code gestructureerd?

Testresultaten en feedback

Welke tests zijn uitgevoerd en wat waren de bevindingen?

Welke verbeterpunten zijn er voor de volgende versie?

Aanbevelingen voor verdere ontwikkeling

Welke features moeten nog toegevoegd worden?

Hoe kan de performance verbeterd worden?

Hoe ziet zo’n document eruit?
Dit kan een gestructureerd Google Docs-bestand, een Notion-pagina of een Confluence-document zijn. Voor een developer handboek kun je ook een README-bestand gebruiken als je een code-based prototype hebt.
