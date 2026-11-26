const mongoose = require('mongoose');

const LookSchema = new mongoose.Schema({
  data: {
    type: String,
    default: () => new Date().toLocaleDateString('pt-BR')
  },
  pecas: [
    {
      nome: String,
      categoria: String,
      imagemUrl: String,
      zIndex: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Look', LookSchema);