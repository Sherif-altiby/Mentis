import { useState } from 'react';
import './auth.scss';
import { Link, useNavigate } from "react-router-dom"
import Loading from "../pages/loading/Loading";
import { getUserInfo, login } from '../utils/api';
import Circles from '../components/animation/Circles';

import { setToken } from './tokenSlice';

import { setLoading } from "../pages/loading/Loadingslice";
import { useAppDispatch, useAppSelector } from "../redux/reduxHook";
import { setUserInfo } from '../components/Navbar/userInfo';

const Login = () => {

  const navigate = useNavigate()

  const loading = useAppSelector((state) => state.loading.isLoading);
  const dispatch = useAppDispatch()

  const [error, setError] = useState(false)

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userEmailValidate, setUserEmailValidate] = useState(true);
  const [passwordValidate, setPasswordEmailValidate] = useState(true);

  const handleSubmit = async () => {
    if(userEmail.length > 0 && password.length > 0){
      
      dispatch(setLoading(true))
     
      try{
        const data = await login({ email: userEmail, password })
        
        if(data){ 
          dispatch(setToken(data.token))

          console.log(data);

          const loginData = await getUserInfo(data.token)

          console.log(loginData)
          dispatch(setUserInfo(loginData))

          if(loginData.role === "student"){
              navigate('/')
              dispatch(setLoading(false))
          }
          else if(loginData.role === "teacher"){
            dispatch(setLoading(false))
            navigate('/teacher/dashboard/controle')
          }
          else if(loginData.role === "admin"){
            dispatch(setLoading(false))
             navigate('/admin/dashboard/controle')
          } else {
            console.log(loginData)
          }
        }
      }catch(error){
        dispatch(setLoading(false))
        setError(true)
       }
    
    } else{
      setUserEmailValidate( userEmail.length > 0 )
      setPasswordEmailValidate( password.length > 0 )
    }
  }

  // 850439@Mentis.com
  // 1UICrK20

  return (
    <div  className='signup' >
       <Circles />
       { loading ? (<Loading />) : (
          <form action="">
          <h3 className="error">{error ? "البريد الإلكتروني او كلمة المرور خطا" : null}</h3>
          <h1> تسجيل  الدخول </h1>
          <div className="input-container">
                 <div className="input">
                    <label htmlFor="arabic-name"> اسم المستخدم  </label>
                    <input type="text" id='arabic-name' 
                       className={userEmailValidate ? "" : "error"}
                       onChange={(e) => setUserEmail(e.target.value)}  />
                 </div>
                 <div className="input">
                    <label htmlFor="user-password"> كلمة المرور   </label>
                    <input type="text" id='user-password' 
                       className={passwordValidate ? "" : "error"}
                       onChange={(e) => setPassword(e.target.value)} />
                 </div>
          </div>
          
          
          <div className="btns">
              <div className="btn" onClick={handleSubmit} > تسجيل </div>
              <Link to='/forgot-password'> نسيت كلمة المرور ؟</Link>
          </div>
      </form>
        )
       }
    </div>
  )
}

export default Login