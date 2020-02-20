const mongoose = require("mongoose");

const citatSchema = mongoose.Schema({
    titel: {
        type: String,
        required: true
    },
    citatTekst: {
        type: String,
        required: true
    },
    citatDato: {
        type: Date,
        required: true,
        default: Date.now
    },
    kategori: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Kategori'
    }
    
});

module.exports = mongoose.model('Citat', citatSchema)