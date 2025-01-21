import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import { extractFormData } from '../../../Server/helpers/util';

export default function Home () {
    const nameRef = useRef()
    const lastNameRef = useRef()
    const asmensKodoRef = useRef()
    const [alert, setAlert] = useState([])
    const [visosSaskaitos, setVisosSaskaitos] = useState([])
    const [refresh, setRefresh] = useState(false)

    // paimamos visos saskaitos patikrinimui, ar toks asmens kodas jau egzistuoja
    // pats patikrinimas yra gerokai veliau
    useEffect(() => {
        axios.get('/api/users')
        .then(resp => {
            setVisosSaskaitos(resp.data)
        })
    }, [refresh])

    // IBAN generavimui
    const random =(min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();

        let asmensKodas = asmensKodoRef.current.value
        let lastName = lastNameRef.current.value
        let name = nameRef.current.value

        // Bijojau keisti image upload route/bloka, tai isskyriau image upload ir 
        // duomenu upload
        const image = new FormData(e.target);
        // console.log("data:", data);
        // console.log("data.entries():", data.entries());

        // "Nera tusciu laukeliu" check
        if (!lastName || !name || !asmensKodas) {
            setAlert({
                message: "Nevisi reikalingi duomenys buvo ivesti.",
                status: "danger"
            })
            return
        }

        // asmens kodo validity check
        let century = asmensKodas[0]
        let year = asmensKodas.slice(1, 3)
        let month = asmensKodas.slice(3, 5)
        let day = asmensKodas.slice(5, 7)

        // patikrinimas, ar nebuvo prideta per daug simboliu i asmens koda
        if (asmensKodas.length !== 11){
            setAlert({
                message: "Netinkamas asmens kodas, patikrinkite ar nepraleidote simbolio",
                status: "danger"
            })
            return
        }

        // patikrinimas, ar keliautojas laiku nenusprende susikurti saskaitos
        if (century < "3" ||
            century > "6") {
                setAlert({
                    message: "Asmuo su tokiu asmens kodu negali egzistuoti",
                    status: "danger"
                })
                return
        }

        // patikrinimas, ar zmogus, kuriam yra kuriama saskaita yra jau gimes
        if ((century === "5" || century === "6") && 
            year > 25 ){
            setAlert({
                message: "Asmuo su tokiu asmens kodu yra dar negimes",
                status: "danger"
            })
            return
        }

        // patikrinimas, kad yra parasytas galimas menesio-dienos skaicius
        // (kad nebutu 15 menesio 60 diena)
        // as tikiuosi, kad sitas kodas veikia, taip kaip as noreciau
        if ( (year < 0) ||
            (month > 12 || month < 0) ||
            (day > 31 || day < 0) ){
            console.log("aktyvavosi dienos-menesio blokas");
            
            setAlert({
                message: "Negalima gimimo data",
                status: "danger"
            })
            return
        }

        // patikrinimas, ar yra toks asmens kodas duomenu bazeje
        axios.get('/api/users')
        .then(resp => {
            setVisosSaskaitos(resp.data)
        })

        for (let item of visosSaskaitos){
            if (item.asmensKodas === asmensKodas){
                setAlert({
                    message: "Toks vartotojas jau egzistuoja",
                    status: "danger"
                })
                return
            }
        }
            
        setAlert({
            message: "Saskaita sekmingai sukurta",
            status: "success"
        })
        // Saskaitos numerio generavimas

        let saskaitosKodas = ""
        let tarpas = " "
        for (let i =0; i<22; i++){
            let skaicius = random(0, 9)
            if (i === 2 ||
                i === 7 ||
                i === 12 ||
                i === 17){
                    saskaitosKodas += tarpas
                }
            else {
                saskaitosKodas += skaicius
            }
        }
        
        let data = {
            vardas: name,
            pavarde: lastName,
            asmensKodas: asmensKodas,
            saskaitosNumeris: "LT" + saskaitosKodas
        } 

        // Vartotojo duomenu nusiuntimas i serveri
        axios.post('/api/users/add', data)
        .then(resp => {
        console.log("account created");

        setAlert({
            message: "Nauja saskaita sukurta",
            status: "success"
        }) })

        // Nuotraukos ikelimas
        axios.post('/api', image)
        .then(resp => console.log(resp));

        setRefresh(!refresh)
    }
   
   
    return (
        <>
            {alert.message && 
                    <div className={"mt-4 alert alert-" + alert.status}>
                        {alert.message}
                    </div>
                }
            <h1 className="mb-5">Nauja saskaita</h1>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <label htmlFor="vardas">Vartotojo Vardas</label>                
                <input type="text" name="vardas" className="mb-4" ref={nameRef}/>
                
                <label htmlFor="pavarde">Vartotojo Pavarde</label>
                <input type="text" name="pavarde" className="mb-4" ref={lastNameRef}/>
                
                <label htmlFor="asmensKodas">Vartotojo Asmens Kodas</label>
                <input type="number" name="asmensKodas" className="mb-4" ref={asmensKodoRef}/>
                
                <label htmlFor="nuotrauka">Vartotojo Paso Nuotrauka</label>
                <input type="file" name="nuotrauka" className="mb-4"/>

                <button className="btn btn-primary">Sukurti Paskyra</button>
            </form>
        </>
    )
}