 import './App.scss';
 import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Navbar/Nav';
import Home from './pages/Home/Home';
import Footer from './components/footer/Footer';
 
 const App = () => {
   return (
     <Router>
         <Nav />
         <Home />
         <Footer />
     </Router>
   )
 }
 
 export default App