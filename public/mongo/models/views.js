const mongoose = require('mongoose');
const shortid = require('shortid');

const ViewSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    userId: { type: String, ref: 'Users' },  // Quem visualizou
    caseId: { type: String, ref: 'Cases', required: true },  // Caso visualizado
    dataVisualizacao: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Views', ViewSchema);