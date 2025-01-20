import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Prideti () {
    const [data, setData] = useState([])
    const { id } = useParams()
    const inputRef = useRef()
    const [newAmount, setNewAmount] = useState()
    const [refresh, setRefresh] = useState(false)
    const [alert, setAlert] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/users/' + id)
        .then(resp => {
            setData(resp.data)
        })
    }, [refresh])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newAmount) {
            setNewAmount(data.lesos)
        }
        let addedAmount = inputRef.current.value;
        let newTotal = data.lesos - parseFloat(addedAmount)

        if (parseFloat(newTotal) < 0){
            setAlert({
                message: "Tokios sumos nuskaityti negalima",
                status: "danger"
            })
            return
        }
        data.lesos = newTotal
        
        axios.put('/api/users/edit/' + id, data)
        .then(resp => {
            console.log(resp.data.message);
            setAlert({
                message: resp.data.message,
                status: "success"
            })
            setRefresh(!refresh)
        })
        // bandziau padaryti, kad alert message atsirastu po consistent amount of time
        // nuo pinigu pridejimo
        // Del to yra 2 timeouts, nes tik su vienu niekaip nespedavo message atsirasti
        // Galvoju taip pat ar is viso palikti ta zinute, kadangi jinai atsiranda inconsistently?
        setTimeout(() => {
            setTimeout(() => {
                navigate('/saskaitos')
            }, 2000)
        }, 1000)
        
    }

    return (
        <>
            <h1>Nuskaiciuoti lesu</h1>
            
            {alert.message && 
                    <div className={"mt-4 alert alert-" + alert.status}>
                        {alert.message}
                    </div>
                }

            <div className="output d-flex gap-5">
                <div className="d-flex gap-2">
                    <div className="user">
                        <h4>{data.vardas} {data.pavarde}</h4>
                        <p className="grey">{data.asmensKodas}</p>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <p className="grey">Balansas:</p>
                    <p>{data.lesos} Eur</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="number" ref={inputRef}/>
                    <button className="btn btn-primary">Nuskaiciuoti</button>
                </form>
            </div>
            
        </>
    )
}