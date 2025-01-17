import express from 'express'
import mongoose from 'mongoose'

import user from './controller/user.js'

const app = express()
app.use(express.json());
app.use('/', user)


try {
    await mongoose.connect('mongodb://127.0.0.1:27017/banking')

    app.listen(3000)

    console.log("veikia");
    
} catch {
    console.log("neveikia");
    
}