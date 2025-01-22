import { Link } from 'react-router-dom'
import axios from 'axios'
 
export default function Header ( {user, setUser} ){

    const handleLogout = () => {
        axios.get('/api/logout')
        .then(resp => setUser(false))
        // .catch(err => console.error("Logout failed", err))
    }

    return (
        <div className='header d-flex gap-5 mt-4'>
            <p><Link to={'/'}>Titulinis</Link></p>
            { user ?
                <> 
                    <p><Link to={'/saskaitos'}>Sąskaitų sąrašas</Link></p>
                    <p><Link to={'/prideti-saskaita'}>Nauja sąskaita</Link></p>
                    <p onClick={handleLogout}><Link to={'/'}>Atsijungti</Link></p>
                </> 
                :
                <p><Link to={'/prisijungti'}>Prisijungti</Link></p>
            }
            
        </div>
    )
}