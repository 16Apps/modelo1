const mongoose = require('mongoose');
const shortid = require('shortid');

const CaseSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    autor: { type: String, ref: 'Users', required: true },  // Professor que criou o caso
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    imagens: [{ type: String, ref: 'Files' }], // Referência para arquivos no GridFS
    videos: [{ type: String, ref: 'Files' }],
    tags: [{ type: String }],  // Lista de tags para organização
    visualizacoes: { type: Number, default: 0 },
    curtidas: [{ type: String, ref: 'Users' }], // Quem curtiu
    salvosPor: [{ type: String, ref: 'Users' }], // Quem salvou
    dataCriacao: { type: Date, default: Date.now },
    dataAtualizacao: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Cases', CaseSchema);