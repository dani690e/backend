const express = require("express");
const Citater = require("../models/citatModels")
const Kategorier = require("../models/kategoriModels")

const router = express.Router();

const getCitatById = async (req, res, next) => {
    let citat;
    try {
        citat = await Citater.findById(req.params.id).populate("kategori");
        if (!citat)
            return res.status(404).json({ message: "Cannot find citat" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
    res.citat = citat;
    next();
}

router.get("/", async (req, res) => {
    const citater = await Citater.find().populate("kategori");
    res.send(citater);
});

router.get("/:id", getCitatById, async(req, res) => {
    res.send(res.citat);
});

router.get("/getbykat/:id", async (req, res) => {
    const citater = await Citater.find({kategori: req.params.id})
    res.send(citater)
})

router.post("/", async (req, res) => {
    const citat = new Citater(req.body);
    try {
        const newCitat = await citat.save();
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.patch("/:id", getCitatById, async (req, res) => {
    if (req.body.titel)
        res.citat.titel = req.body.titel;
    if (req.body.citatTekst)
        res.citat.citatTekst = req.body.citatTekst
    if (req.body.kategori)
        res.citat.kategori = req.body.kategori
    try {
        const updatedCitat = await res.citat.save();
        res.json(updatedCitat);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err });
    }
});

router.delete("/all", async (req, res) => {
    try {
        const citater = await Citater.find({});
        for (const citat of citater) {
            await citat.remove();
        }
        res.json({ message: `Slettet alle ${citater.length} citater` });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.delete("/:id", getCitatById, async (req, res) => {
    try {
        const citat = Citater.findById(req.params.id)
        await citat.remove()
        res.json({ message: "Citat slettet" });
    } catch (err) {
        res.status(500).json({ message: err })
    }
});

module.exports = router