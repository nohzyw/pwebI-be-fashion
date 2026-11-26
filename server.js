require('dns').setServers(['8.8.8.8', '1.1.1.1']);
global.crypto = require('crypto').webcrypto;
require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const Look = require('./models/Look');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Listar todos os looks salvos no MongoDB
app.get('/api/looks', async (req, res) => {
  try {
    const looks = await Look.find().sort({ createdAt: -1 });
    res.json(looks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar looks' });
  }
});

// Salvar um novo look no MongoDB
app.post('/api/looks', async (req, res) => {
  try {
    const novoLook = await Look.create({
      data: new Date().toLocaleDateString('pt-BR'),
      pecas: req.body.pecas
    });
    res.status(201).json(novoLook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao salvar look' });
  }
});

// Excluir um look pelo _id do MongoDB
app.delete('/api/looks/:id', async (req, res) => {
  try {
    await Look.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Look excluído' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao excluir look' });
  }
});

app.use('/api/pecas', require('./routes/pecas'));
app.use('/', require('./routes/views'));

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});