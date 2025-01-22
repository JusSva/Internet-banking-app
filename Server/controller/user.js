import express from 'express';
import multer from 'multer';
import { Router } from 'express'
import { auth } from '../middleware/auth.js';
import User from '../model/user.js'
import Admin from '../model/admin.js'
import bcrypt from 'bcrypt';

const router = Router()

// kadangi prisijungimo duomenys duodami, 
// tai sitos 2 eilutes yra tiesiog kad tureti ka ideti i duombaze
// let password = "123456"
// console.log(await bcrypt.hash(password, 10));

// visi users/saskaitos
router.get('/api/users', auth, async (req, res) => {
    try {
        res.json(await User.find().sort({ pavarde: 'asc'}))
        // res.json("veikia")
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// viena saskaita/user
router.get('/api/users/:id', auth, async (req, res) => {
    try {
        res.json(await User.findById(req.params.id))
    } catch {
        res.status(500).json("Ivyko serverio klaida")
    }
})

// prideti saskaita/user
router.post('/api/users/add', auth, async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ message: "Nauja saskaita sekmingai sukurta", user });
    } catch (err) {
        console.error(err);
        res.status(500).json("Ivyko serverio klaida");
    }
});

// saskaitos (lesu) redagavimas 
router.put('/api/users/edit/:id', auth, async (req, res) => {
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
router.delete('/api/users/delete/:id', auth, async (req, res) => {
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

router.get('/api', failuKelimas, auth, (req, res) => {
    console.log(req.body);
    res.json('Veikia');
});

router.post('/api', upload.single('nuotrauka'), auth, (req, res) => {
    // req.file savybėje nugula persiųsto failo, kuris jau buvo išsaugotas, duomenys
    console.log(req.file);
    console.log(req.body);
    res.json('POST metodu duomenys gauti');
});

router.post('/api/login', async (req, res) => {
    if(!req.body.email || !req.body.password)
        return res.status(500).json('Negauti prisijungimo duomenys');

    const data = await Admin.findOne({ email: req.body.email });

    if(!data) 
        return res.status(401).json('Neteisingi prisijungimo duomenys');
    
    if(!await bcrypt.compare(req.body.password, data.password)) 
        return res.status(401).json('Neteisingi prisijungimo duomenys');
    
    req.session.Admin = {
        vardas: data.vardas,
        pavarde: data.pavarde,
        email: data.email
    };

    res.json(req.session.Admin);
    // res.json(data)
});

router.get('/api/check-auth', (req, res) => {
    res.json(req.session.Admin);
});

router.get('/api/logout', (req, res) => {
    // Sesijos duomenų ištrynimas
    req.session.destroy();
    res.json("Sėkmingai atsijungėte");
});

export default router