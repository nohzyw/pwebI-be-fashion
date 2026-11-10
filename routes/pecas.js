const express = require('express');
const router = express.Router();
const Peca = require('../models/Peca');

router.get('/', async (req, res) => {
  try {
    const pecas = await Peca.find();
    res.json(pecas);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao procurar peças', erro: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const novaPeca = new Peca({
      nome: req.body.nome,
      categoria: req.body.categoria,
      imagemUrl: req.body.imagemUrl,
      zIndex: Number(req.body.zIndex)
    });
    
    await novaPeca.save();
    res.redirect('/cadastrar');
  } catch (error) {
    res.status(400).send(`Erro ao guardar peça: ${error.message}`);
  }
});

module.exports = router;