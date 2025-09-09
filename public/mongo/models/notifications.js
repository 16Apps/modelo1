const mongoose = require('mongoose');
const shortid = require('shortid');

const NotificationSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    userId: { type: String, ref: 'Users', required: true },  // Usuário que recebe a notificação
    tipo: { type: String, enum: ['curtida', 'comentario', 'novoCaso'], required: true },
    referencia: { type: String },  // ID do caso ou comentário relacionado
    lida: { type: Boolean, default: false },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Notifications', NotificationSchema);