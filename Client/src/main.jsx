import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Header from './components/Header'
import NaujaSaskaita from './pages/NaujaSaskaita.jsx'
import SaskaituSarasas from './pages/SaskaituSarasas.jsx'
import Prideti from './pages/Prideti.jsx'
// pakeisit i Nuskaiciuoti, nes for some reason everything decided to break
import Nuskaiciuoti from './pages/NUskaiciuoti.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prideti-saskaita" element={<NaujaSaskaita />} />
        <Route path="/saskaitos" element={<SaskaituSarasas />} />
        <Route path="/prideti/:id" element={<Prideti />} />
        <Route path="/nuskaiciuoti/:id" element={<Nuskaiciuoti />} />
      </Routes>
    </div>
  </BrowserRouter>
)
