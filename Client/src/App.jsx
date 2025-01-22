import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Header from './components/Header'
import NaujaSaskaita from './pages/NaujaSaskaita.jsx'
import SaskaituSarasas from './pages/SaskaituSarasas.jsx'
import Prideti from './pages/Prideti.jsx'
import Nuskaiciuoti from './pages/NUskaiciuoti.jsx'
import Prisijungimas from './pages/Prisijungimas.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function App () {
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get('/api/check-auth')
        .then(resp => setUser(resp.data))
        .catch(err => console.log(err))
    }, [])

    return (
    <BrowserRouter>
        <div className="container">
        <Header user ={user} setUser={setUser}/>
        {user &&
            <div className="mb-3">Sveiki, {user?.vardas}</div>
        }
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prisijungti" element={<Prisijungimas setUser={setUser}/>} />
            {user &&
            <>
                <Route path="/prideti-saskaita" element={<NaujaSaskaita user={user}/>} />
                <Route path="/saskaitos" element={<SaskaituSarasas user={user}/>} />
                <Route path="/prideti/:id" element={<Prideti user={user}/>} />
                <Route path="/nuskaiciuoti/:id" element={<Nuskaiciuoti user={user}/>} />
            </>
            }
        </Routes>
        </div>
    </BrowserRouter>
    )
}