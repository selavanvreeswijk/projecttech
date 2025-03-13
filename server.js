const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'view') 

app.get('/', onhome)

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
})

function onhome(req, res) {
    res.render('index');  
}
