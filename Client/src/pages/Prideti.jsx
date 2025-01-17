import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { extractFormData } from '../helpers/util.js'

export default function Prideti () {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get('/api/users/' + id)
        .then(resp => {
            setData(resp.data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newAmount = extractFormData(e.target)
        console.log(e.target);
        
    }

    return (
        <>
            <h1>Prideti lesu</h1>
            
            <div className="output d-flex gap-5">
                <div className="d-flex gap-2">
                    <div className="user">
                        <h4>{data.vardas} {data.pavarde}</h4>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <p className="grey">Balansas:</p>
                    <p>{data.lesos} Eur</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="number" />
                    <button className="btn btn-primary">Prideti</button>
                </form>
            </div>
            
        </>
    )
}