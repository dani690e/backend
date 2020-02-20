const mongoose = require("mongoose");

const kategoriSchema = new mongoose.Schema({
    kategorinavn: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Kategori", kategoriSchema);