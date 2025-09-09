const mongoose = require('mongoose');
const shortid = require('shortid');

const CommentSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    autor: { type: String, ref: 'Users', required: true },
    caseId: { type: String, ref: 'Cases', required: true },  // Relacionado a um caso clínico
    texto: { type: String, required: true },
    respostas: [{ type: String, ref: 'Comments' }], // Respostas ao comentário
    curtidas: [{ type: String, ref: 'Users' }],
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Comments', CommentSchema);