import { Schema, model } from 'mongoose';

export default model('Users', new Schema({
    vardas: String,
    pavarde: String,
    saskaitosNumeris: String,
    asmensKodas: String,
    lesos: {
        type: Number,
        default: 0
    }
    // ,
    // // Laiko Žymų (timestamp) sukūrimas:
    // createdAt: {
    //     type: Date,
    //     // Dabartinė data ir laikas priskiriamas pagal nutylėjimą:
    //     default: Date.now()
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now()
    // }
}) );


// patikrinti prisijungima