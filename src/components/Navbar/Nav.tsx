import './Nav.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo-2.png'

const Nav = () => {
  return (
    <nav>
         <div className="nav">
             <div className="signin">
                 <div className="btn">
                    <Link to='/signup' > تسجيل الدخول </Link>
                 </div>
             </div>
             <div className="logo">
                 <Link to='/' > <div className="img"> <img src={logo} alt="" /> </div> </Link>
             </div>
         </div> 
    </nav>
  )
}

export default Nav