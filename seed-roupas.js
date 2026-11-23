global.crypto = require('crypto').webcrypto;
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Peca = require('./models/Peca');

const NOVAS_PECAS = [
  { nome: 'Quepe Preto', categoria: 'Chapéu', imagemUrl: '/assets/quepe-preto.png', zIndex: 50 },
  { nome: 'Óculos Fino Preto', categoria: 'Óculos', imagemUrl: '/assets/oculos-fino-preto.png', zIndex: 45 },
  { nome: 'Choker Preta', categoria: 'Colar', imagemUrl: '/assets/choker-preta.png', zIndex: 25 },
  { nome: 'Camiseta Femme Fatale', categoria: 'Camisa', imagemUrl: '/assets/camiseta-femme-fatale.png', zIndex: 30 },
  { nome: 'Polo Adidas Bege', categoria: 'Camisa', imagemUrl: '/assets/polo-adidas-bege.png', zIndex: 30 },
  { nome: 'Blusa California Azul', categoria: 'Camisa', imagemUrl: '/assets/blusa-california-azul.png', zIndex: 30 },
  { nome: 'Top Preto Cruz', categoria: 'Camisa', imagemUrl: '/assets/top-preto-cruz.png', zIndex: 30 },
  { nome: 'Regata Vermelha Sweetheart', categoria: 'Camisa', imagemUrl: '/assets/regata-vermelha-sweetheart.png', zIndex: 30 },
  { nome: 'Regata Preta Tribal', categoria: 'Camisa', imagemUrl: '/assets/regata-preta-tribal.png', zIndex: 30 },
  { nome: 'Regata Rosa Renda', categoria: 'Camisa', imagemUrl: '/assets/regata-rosa-renda.png', zIndex: 30 },
  { nome: 'Regata Preta Um Ombro', categoria: 'Camisa', imagemUrl: '/assets/regata-preta-um-ombro.png', zIndex: 30 },
  { nome: 'Top Tomara-que-caia Vermelho', categoria: 'Camisa', imagemUrl: '/assets/top-tomara-caia-vermelho.png', zIndex: 30 },
  { nome: 'Top Branco Caveira', categoria: 'Camisa', imagemUrl: '/assets/top-branco-caveira.png', zIndex: 30 },
  { nome: 'Saia Jeans Cinza Cinto', categoria: 'Saias', imagemUrl: '/assets/saia-jeans-cinza-cinto.png', zIndex: 20 },
  { nome: 'Saia Branca Franzida', categoria: 'Saias', imagemUrl: '/assets/saia-branca-franzida.png', zIndex: 20 },
  { nome: 'Short Bege Estrelas', categoria: 'Calças', imagemUrl: '/assets/short-bege-estrelas.png', zIndex: 20 },
  { nome: 'Short Jeans Escuro', categoria: 'Calças', imagemUrl: '/assets/short-jeans-escuro.png', zIndex: 20 },
  { nome: 'Vestido Azul Drapeado', categoria: 'Vestidos', imagemUrl: '/assets/vestido-azul-drapeado.png', zIndex: 25 },
  { nome: 'Vestido Rosa Franzido', categoria: 'Vestidos', imagemUrl: '/assets/vestido-rosa-franzido.png', zIndex: 25 }
];

(async () => {
  try {
    await connectDB();
    await Peca.insertMany(NOVAS_PECAS);
    console.log('✅ 19 peças cadastradas com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao cadastrar:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();