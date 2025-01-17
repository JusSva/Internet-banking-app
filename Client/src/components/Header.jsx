import { Link } from 'react-router-dom'
 
export default function Header (){


    return (
        <div className='header d-flex gap-5 mt-4'>
            <p><Link to={'/'}>Titulinis</Link></p>
            <p><Link to={'/saskaitos'}>Sąskaitų sąrašas</Link></p>
            <p><Link to={'/prideti-saskaita'}>Nauja sąskaita</Link></p>
        </div>
    )
}