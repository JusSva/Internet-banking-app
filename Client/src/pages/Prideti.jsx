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
        data.lesos = data.lesos + parseFloat(addedAmount)
        
        axios.put('/api/users/edit/' + id, data)
        .then(resp => {
            setAlert({
                message: resp.data.message,
                status: "success"
            })
            setRefresh(!refresh)
        })
    }

    return (
        <>
            <h1>Prideti lesu</h1>
            
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
                    <button className="btn btn-primary">Prideti</button>
                </form>
            </div>
            
        </>
    )
}