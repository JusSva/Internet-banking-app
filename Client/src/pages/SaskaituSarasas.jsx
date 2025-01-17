import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
    const [data, setData] = useState([])
    const [alert, setAlert] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('/api/users')
        .then(resp => setData(resp.data))
        .catch(err => setAlert({
            message: err.response.data,
            status: 'danger'
        }))
    }, [refresh])



    const handleDelete = (id, lesos) => {
        
        if (parseFloat(lesos) > 0){
            setAlert({
                message: "Saskaitos istrynimas, kuomet joje yra lesu, yra negalimas",
                status: "danger"
            })
            
            return 
        }
        axios.delete('api/users/delete/' + id)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            setRefresh(!refresh)
        })
        .catch(err => setAlert({
            message: err.response.data,
            status: 'warning'
        }))
    }



    return (
        <>
            <h1>Saskaitu Sarasas</h1>
            {alert.message && 
                    <div className={"mt-4 alert alert-" + alert.status}>
                        {alert.message}
                    </div>
                }
            <div className="output">
                {data.map(item => 
                    <div className="d-flex gap-5 p-4">
                        <div className="zmogus">
                            <p className='grey'>Savininko vardas, pavarde:</p>
                            <p className='name'>{item.vardas} {item.pavarde}</p>
                        </div>
                        <div className="saskaita">
                            <p className='grey'>Saskaitos numeris:</p>
                            <p>{item.saskaitosNumeris}</p>
                        </div>
                        <div className="kodas">
                            <p className='grey'>Asmens kodas:</p>
                            <p>{item.asmensKodas}</p>
                        </div>
                        <div className="lesos">
                            <p className="grey">Lesos:</p>
                            <p>{item.lesos} Eur</p>
                        </div>
                        <button className='button btn'><Link to={"/prideti/" + item._id}>Prideti Lesas</Link></button>
                        <button className='button btn'><Link to={"/nuskaiciuoti/" + item._id}>Nuskaiciuoti Lesas</Link></button>
                        <button className="button btn btn-danger" onClick={() => handleDelete(item._id, item.lesos)}>Istrinti Saskaita</button>
                    </div>
                )}
            </div>
        </>
    )
}