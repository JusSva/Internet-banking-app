import { Schema, model } from 'mongoose';

export default model('Users', new Schema({
    vardas: {
        type: String,
        required: true //Nurodymas, jog reikšmė yra privaloma
    },
    pavarde: {
        type: String,
        required: true 
    },
    saskaitosNumeris: {
        type: String,
        required: true
    },
    asmensKodas: {
        type: String,
        required: true 
    },
    lesos: Number,
    // Laiko Žymų (timestamp) sukūrimas:
    createdAt: {
        type: Date,
        // Dabartinė data ir laikas priskiriamas pagal nutylėjimą:
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    admin : {
        type: Boolean,
        default: false
    }
}));