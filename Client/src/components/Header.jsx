import { Link } from 'react-router-dom'
 
export default function Header (){


    return (
        <>
            <Link to={<Home />}>Sąskaitų sąrašas</Link>
            <Link to={<Home />}>Nauja sąskaita</Link>
            <Link to={<Home />}>Valdyti lėšas</Link>
        </>
    )
}