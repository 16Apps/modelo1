const mongoose = require('mongoose');
const shortid = require('shortid');

const SavedCaseSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    userId: { type: String, ref: 'Users', required: true },
    caseId: { type: String, ref: 'Cases', required: true },
    dataSalvo: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('SavedCases', SavedCaseSchema);