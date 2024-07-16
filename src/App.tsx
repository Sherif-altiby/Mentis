 import './App.scss';
 import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
  import Material from './pages/material/Material';
 import Signup from './auth/Signup';
 import Login from './auth/Login';
import Main from './components/Main/Main';
import Home from './pages/Home/Home';
import ForgotPassword from './auth/ForgotPassword';
import Teacher from './pages/teacher/Teacher';
 
 const App = () => {
   return (
     <Router>
         {/* <Nav /> */}
           <Routes>
               <Route path='/' element={<Home />}>
                         <Route index element={<Main />} />
                         <Route path='material/:materialId' element={<Material />} />
                         <Route path='teacher/:teacherId' element={<Teacher />} />
                </Route>
               <Route path='/signup' element={<Signup />} />
               <Route path='/login' element={<Login />} />
               <Route path='/forgot-password' element={<ForgotPassword />} />
           </Routes>
         {/* <Footer /> */}
     </Router>
   )
 }
 
 export default App