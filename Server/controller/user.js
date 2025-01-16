import { Router } from 'express'
import User from '../model/user.js'

const router = Router()

// visi users/saskaitos
router.get('/api', async (req, res) => {
    try {
        res.json(await User.find())
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// viena saskaita/user
router.get('/api/:id', async (req, res) => {
    try {
        res.json(await User.findById(req.params.id))
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// prideti saskaita/user
router.post('/api/prideti-saskaita', async (req, res) => {
    try {
        res.json(await User.create(req.body))

        res.json("Nauja saskaita sekmingai sukurta")
    } catch {
        res.status(500).json("Isvyko serverio klaida")
    }
})

// saskaitos (lesu) redagavimas 
router.put('/api/edit/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// saskaitos istrynimas
router.delete('/api/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json("Saskaita istrinta")
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})