import { Schema, model } from 'mongoose';

export default model('Administrators', new Schema({
    vardas: String,
    pavarde: String,
    email: String,
    password: String
}) );
