const mongoose = require('mongoose');

const PecaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { 
    type: String, 
    required: true, 
    enum: ['Chapéu', 'Cabelo', 'Óculos', 'Colar', 'Camisa', 'Casaco', 'Calças', 'Saias', 'Vestidos', 'Meias-calças', 'Calçados'] 
  },
  imagemUrl: { type: String, required: true },
  zIndex: { type: Number, required: true }
});

module.exports = mongoose.model('Peca', PecaSchema);