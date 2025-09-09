const mongoose = require('mongoose');
const shortid = require('shortid');

var ContaSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    ativo: { type: Number, enum: [0, 1], default: 1 },
    matriz: { type: Boolean, default: false },
    nome: { type: String },
    apelido: { type: String },
    cnpj_cpf: { type: String },
    contato_responsavel: { type: String },
    contato_celular: { type: String },
    logo: { type: String },
    telefone: { type: String },
    celular: { type: String },
    email: { type: String },
    site: { type: String },
    cep: { type: String },
    logradouro: { type: String },
    numero: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String }
}, {
    versionKey: false
});

module.exports = mongoose.model('Conta', ContaSchema);
