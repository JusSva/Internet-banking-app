import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Header from './components/Header'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/prideti-saskaita" element={<NaujaSaskaita />} />
        <Route path="/saskaitos" element={<SaskaituSarasas />} />
        <Route path="/prideti" element={<Prideti />} />
        <Route path="/nuskaiciuoti" element={<Nuskaiciuoti />} /> */}
      </Routes>
    </div>
  </BrowserRouter>
)
