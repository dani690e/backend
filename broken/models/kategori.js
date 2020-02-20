const mongoose = require("mongoose");

const kategoriSchema = mongoose.Schema({
    kategorinavn: {
        type: String,
        required: true
    },
    citater: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Citat"
    }]
});

module.exports = mongoose.model('Kategori', kategoriSchema)