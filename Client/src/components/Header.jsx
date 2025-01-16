import { Link } from 'react-router-dom'
 
export default function Header (){


    return (
        <div className='header d-flex gap-5 mt-4'>
            <p><Link to={'/'}>Sąskaitų sąrašas</Link></p>
            <p><Link to={'/'}>Nauja sąskaita</Link></p>
            <p><Link to={'/'}>Pridėti lėšas</Link></p>
            <p><Link to={'/'}>Nuskaičiuoti lėšas</Link></p>
        </div>
    )
}