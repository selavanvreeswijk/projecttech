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
## Usage
Open your browser and go to http://localhost:9000.

- Browse and search for plant information
- Save plants to your favorite list
- Filter and sort plants based on different attributes

## Technologies used
- **Node.js** - Javascript runtime for the backend
- **Expess.js** - Web framework for handling routes and requests
- **MongoDB** - NoSQL database for storing user data
- **EJS** - Templating engine for dynamic HTML
- **Fetch API** - To retrieve and display plant data

## Contribution
Contribution is welcome! You can contribute by forking the repository and making a pull request.

## License
This project is licensed under the ISC license.

## Contact
For questions and suggestions, contact us via sela.van.vreeswijk@hva.nl
