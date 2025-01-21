import express from 'express';
import multer from 'multer';
import { Router } from 'express'
import User from '../model/user.js'

const router = Router()

// visi users/saskaitos
router.get('/api/users', async (req, res) => {
    try {
        res.json(await User.find().sort({ pavarde: 'asc'}))
        // res.json("veikia")
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// viena saskaita/user
router.get('/api/users/:id', async (req, res) => {
    try {
        res.json(await User.findById(req.params.id))
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// prideti saskaita/user
router.post('/api/users/add', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ message: "Nauja saskaita sekmingai sukurta", user });
    } catch (err) {
        console.error(err);
        res.status(500).json("Ivyko serverio klaida");
    }
});

// saskaitos (lesu) redagavimas 
router.put('/api/users/edit/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "vartotojas nerastas" });
        }
        res.json({ message: "Lesu kiekis sekmingai atnaujintas", updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json("Ivyko serverio klaida");
    }
});


// saskaitos istrynimas
router.delete('/api/users/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json("Saskaita istrinta")
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// photo upload
const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './uploads');
    },
    filename: function (req, file, next) { 
        next(null, Date.now() + '.jpg');
    }
});

const upload = multer({ storage: storage });

// Norint priimti duomenis JSON formatu
router.use(express.json());

// Nuotrauku atvaizdavimui skirta konfiguracine eilute
router.use('/nuotraukos', express.static('uploads'));

// Middleware priskyrimas
const failuKelimas = (req, res, next) => {
    console.log('Failu kelimas aktyvuotas');

    if(req.query.zinute === 'true') 
        return res.json('Gavome Jūsų žinutę');

    next();
}

router.get('/api', failuKelimas, (req, res) => {
    console.log(req.body);
    res.json('Veikia');
});

router.post('/api', upload.single('nuotrauka'), (req, res) => {
    // req.file savybėje nugula persiųsto failo, kuris jau buvo išsaugotas, duomenys
    console.log(req.file);
    console.log(req.body);
    res.json('POST metodu duomenys gauti');
});



export default router