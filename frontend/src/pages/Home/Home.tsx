 
import './Home.scss';

import { Outlet } from 'react-router-dom';
import Nav from '../../components/Navbar/Nav';
import Footer from '../../components/footer/Footer';
import { useAppSelector } from '../../redux/reduxHook';
 
 


const Home = () => {
 
  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme)

  return (
    <div className={`home-container ${appMode}`}>  
        <Nav />  
            <Outlet />
        <Footer />
    </div>
  )
}

export default Home