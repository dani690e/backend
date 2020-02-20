const express = require("express");
const Kategorier = require("../models/kategoriModels")

const router = express.Router();

router.get("/:id", async (req, res) => {
    const kategorier = await Kategorier.findById(req.params.id);
    res.send(kategorier);
});

router.get("/", async (req, res) => {
    const kategorier = await Kategorier.find();
    res.send(kategorier);
});

router.post("/", async (req, res) => {
    const kategori = new Kategorier(req.body);
    try {
        const newKategori = await kategori.save();
        res.status(201).json(newKategori);
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.delete("/:id", async(req, res) => {
    const kategori = await Kategorier.findById(req.params.id);
    kategori.remove();
    res.json({ message: "Kategori slettet" })
});

module.exports = router