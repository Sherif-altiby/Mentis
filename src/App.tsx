import './App.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Material from './pages/material/Material';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Main from './components/Main/Main';
import Home from './pages/Home/Home';
import ForgotPassword from './auth/ForgotPassword';
import Teacher from './pages/teacher/Teacher';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute ';
import NotFound from './pages/notfound/NotFound';
import StudentProfile from './pages/studentdashboard/StudentDashboard';
import Dashboard from './components/userDashboardComponents/Dashboard/Dashboard';
import Lecture from './components/userDashboardComponents/lecture/Lecture';
import Quizes from './components/userDashboardComponents/quizes/Quizes';
import Books from './components/userDashboardComponents/books/Books';
import Setting from './components/userDashboardComponents/setting/Setting';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
            <Route index element={<Main />} />
            <Route path="material/:materialId" element={<ProtectedRoute element={Material} />} />
            <Route path="teacher/:teacherId" element={<ProtectedRoute element={Teacher} />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/user/user-profile' element={<StudentProfile />} >
               <Route index element={<Dashboard />} />
               <Route path='dashboard' element={<Dashboard />} />
               <Route path='lectures' element={<Lecture />} />
               <Route path='quizes' element={<Quizes />} />
               <Route path='books' element={<Books />} />
               <Route path='setting' element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
