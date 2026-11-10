const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Início' });
});

router.get('/cadastrar', (req, res) => {
  res.render('cadastrar', { pageTitle: 'Cadastrar Peça' });
});

module.exports = router;