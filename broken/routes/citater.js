const express = require("express");
const router = express.Router()
const Citat = require('../models/citat')

// Get all
router.get('/', async (req, res) => {
    try {
        const citater = await Citat.find();
        res.json(citater)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Get by ID
router.get('/:id', getById, (req, res) => {
    res.json(res.citat)
})

//Search
router.get('/search/:query', async (req, res) => {
    let searchWord = req.params.query;
    try {
        const citater = await Citat.find({
            $or: [
                {
                    "titel": {
                        "regex": searchWord,
                        "$options": "i"
                    }
                },
                {
                    "citatTekst": {
                        "regex": searchWord,
                        "$options": "i"
                    }
                }
            ]
        })
        res.json(citater)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create one
router.post('/', async (req, res) => {
    const citat = new Citat({
        titel: req.body.titel,
        citatTekst: req.body.citatTekst,
        Kategori: req.body.kategori
    })
    try {
        const newCitat = await citat.save()
        res.status(201).json(newCitat)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Update one (With PATCH)
router.patch('/:id', getById, async (req, res) => {
    if (req.body.titel != null) res.citat.titel = req.body.titel
    if (req.body.citatTekst != null) res.citat.citatTekst = req.body.citatTekst
    if(req.body.kategori != null) res.citat.kategori = req.body.kategori
    try {
        const updatedCitat = await res.citat.save()
        res.json(updatedCitat)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Update by ID (With PUT)
router.put('/:id', getById, async (req, res) => {
    if (req.body.titel != null) res.citat.titel = req.body.titel
    if (req.body.citatTekst != null) res.citat.citatTekst = req.body.citatTekst
    if(req.body.kategori != null) res.citat.kategori = req.body.kategori
    try {
        const updatedCitat = await res.citat.save()
        res.json(updatedCitat)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Delete by id
router.delete('/:id', getById, async (req, res) => {
    try {
        await res.citat.remove()
        res.json({ message: 'Deleted citat'})
    } catch (err) {
        res.status(500).json({message: err.message})
        
    }
})

async function getById(req, res, next) {
    let citat
    try {
        citat = await Citat.findById(req.params.id)
        if (citat === null) return res.status(400).json({ message: 'Cannot find the citat you are looking for' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.citat = citat
    next()
}

module.exports = router