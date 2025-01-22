import { useState } from 'react'; 
import axios from 'axios';
import { extractFormData } from '../helpers/util';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = extractFormData(e.target);

        axios.post('/api/login', data)
        .then(resp => {
            setUser(resp.data);
            console.log("prisijungta!");
            navigate('/saskaitos')
        })
        .catch(err => setAlert({
            message: err.response.data,
            status: 'danger'
        }));
    }

    return (
        <>
            <h1>Prisijungimo forma</h1>
            <p>for testing purposes:</p>
            <p className='p-3'>email: admin.administraitis@gmail.com</p>
            <p className='p-3'>password:123456</p>
            {alert.message && 
                <div className={"alert alert-" + alert.status}>{alert.message}</div>
            }
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>El. pašto adresas:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Slaptažodis:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password"
                        required
                    />
                </div>
                <button className="btn btn-primary">Prisijungti</button>
            </form>
        </>
    );
}

export default Login;