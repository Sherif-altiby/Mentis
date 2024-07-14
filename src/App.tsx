 import './App.scss';
 import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav from './components/Navbar/Nav';
import Home from './pages/Home/Home';
import Footer from './components/footer/Footer';
import Material from './pages/material/Material';
 
 const App = () => {
   return (
     <Router>
         <Nav />
           <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/material/:materialId' element={<Material />} />
           </Routes>
         <Footer />
     </Router>
   )
 }
 
 export default App