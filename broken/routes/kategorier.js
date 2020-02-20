const express = require("express");
const router = express.Router()
const Kategori = require('../models/kategori');

//Get all
router.get('/', async (req, res) => {
    try {
        const kategorier = await Kategori.findById();
        res.json(kategorier)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get by ID
// router.get('/:id', getById, (req, res) => {
//     res.json(res.kategori)
// })

// Get citater by Category
router.get('/:id', async(req, res) => {
    const citater = await Kategori.findById(req.params.id).populate('citater');
    res.send(citater)
})

//Create Kategori
router.post('/', async (req, res) => {
    const kategori = new Kategori({
        kategorinavn: req.body.kategorinavn
    })
    try {
        const newKategori = await kategori.save()
        res.status(201).json(newKategori)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})

//Delete Kategori
router.delete('/:id', getById, async (req, res) => {
    try {
        await res.kategori.remove()
        res.json({ message: 'Deleted Kategori' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getById(req, res, next) {
    let kategori
    try {
        kategori = await Kategori.findById(req.params.id)
        if (kategori === null) return res.status(400).json({ message: 'Cannot find the categori you are looking for' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.kategori = kategori
    next()
}

module.exports = router