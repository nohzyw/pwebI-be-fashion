const express = require('express');
const path = require('path');
const app = express();
const PORT = 5173;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/montar-look', (req, res) => {
    res.render('montar-look');
});