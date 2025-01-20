import axios from 'axios'
import { useRef, useState } from 'react';
import { extractFormData } from '../../../Server/helpers/util';

export default function Home () {
    const nameRef = useRef()
    const lastNameRef = useRef()
    const asmensKodoRef = useRef()
    const [alert, setAlert] = useState([])

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

        if (asmensKodas.length !== 11){
            console.log("aktyvavosi < 11");
            
            setAlert({
                message: "Netinkamas asmens kodas, patikrinkite ar nepraleidote simbolio",
                status: "danger"
            })
            return
        }

        if (century < "3" ||
            century > "6") {
                setAlert({
                    message: "Asmuo su tokiu asmens kodu negali egzistuoti",
                    status: "danger"
                })
                return
        }

        if ((century === "5" || century === "6") && year > 25 ){
            setAlert({
                message: "Asmuo su tokiu asmens kodu yra dar negimes",
                status: "danger"
            })
            return
        }

        // as tikiuosi, kad sitas kodas veikia, taip kaip as noreciau
        if ( (year < 0) ||
            (month > 12 || month < 0) ||
            (day > 31 || day < 0) ){
            setAlert({
                message: "Negalima gimimo data",
                status: "danger"
            })
            return
        }
            
        // Saskaitos numerio generavimas


        let data = {
            vardas: name,
            pavarde: lastName,
            asmensKodas: asmensKodas,
            saskaitosNumeris: "LT-0214853135486464"
        } 

        // Vartotojo duomenu nusiuntimas i serveri
        axios.post('/api/users/add', data)
        .then(resp => {
        console.log("account created");

        setAlert({
            message: "Nauja saskaita sukurta",
            status: "success"
        })
        })

        // Nuotraukos ikelimas
        axios.post('/api', image)
        .then(resp => console.log(resp));
    }
   
   
    return (
        <>
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