import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Nuskaiciuoti () {
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
    }

    return (
        <>
            <h1>Nuskaiciuoti lesu</h1>
            {
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
                    <input type="text" />
                    <button className="btn btn-primary">Nuskaiciuoti</button>
                </form>
            </div>
            }
        </>
    )
}