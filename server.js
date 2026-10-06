const express = require('express');
const path = require('path');
const app = express();
const PORT = 5173;

// Configurar o motor de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir ficheiros estáticos (CSS, JS, Imagens)
app.use(express.static(__dirname));

// Rota principal
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});