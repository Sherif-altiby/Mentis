import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  return (
    <nav>
         <div className="nav">
             <div className="signin">
                 <div className="btn">
                    <Link to='/sinup' > تسجيل الدخول </Link>
                 </div>
             </div>
             <div className="logo">
                 <Link to='/' > Logo </Link>
             </div>
         </div> 
    </nav>
  )
}

export default Nav