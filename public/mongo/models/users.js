
const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    nome: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['aluno', 'professor'], required: true },
    fotoPerfil: { type: String, ref: 'Files' },  // Referência a GridFS
    biografia: { type: String },
    instituicao: { type: String },
    seguidores: [{ type: String, ref: 'Users' }], // Relacionamento entre usuários
    seguindo: [{ type: String, ref: 'Users' }],
    dataCadastro: { type: Date, default: Date.now },
    ultimaAtividade: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Users', UserSchema);