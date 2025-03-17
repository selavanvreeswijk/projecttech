const express = require('express');
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'view') 

app.get('/', onhome)
    .listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
})

function onhome(req, res) {
    res.render('index');  
}