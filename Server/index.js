import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session';
import user from './controller/user.js'

const app = express()

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/banking')

    app.set('trust proxy', 1) 

    app.use(session({
        secret: 'Mano slaptoji unikalioji fraze yra ta pati fraze, kuri buvo naudota per Raudonasias Vestuves', // Slapta unikali frazė
        resave: false, // Leidžiame slapuko perrašymą
        saveUninitialized: true, // Išduodame sausainėlį nepriskyrus jokių reikšmių
        cookie: { secure: false } // Secure nurodo ar kreipsimės per HTTPS protokolą
    }));
    app.use(express.json());
    app.use('/', user)
    app.listen(3000)

    console.log("veikia");
    
} catch {
    console.log("neveikia");
    
}