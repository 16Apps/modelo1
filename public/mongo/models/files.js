const mongoose = require('mongoose');
const shortid = require('shortid');

const FileSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    filename: { type: String, required: true },
    tipo: { type: String, enum: ['imagem', 'video'], required: true },
    dataUpload: { type: Date, default: Date.now },
    dono: { type: String, ref: 'Users' } // Quem fez o upload
}, { versionKey: false });

module.exports = mongoose.model('Files', FileSchema);