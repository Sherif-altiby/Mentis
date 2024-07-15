import './auth.scss';
import { Link } from "react-router-dom"

 
const Login = () => {
  return (
    <div  className='signup' >
        <form action="">
            <h1> تسجيل  الدخول </h1>
            <div className="input-container">
                   <div className="input">
                      <label htmlFor="arabic-name"> اسم المستخدم  </label>
                      <input type="text" id='arabic-name'   />
                   </div>
                   <div className="input">
                      <label htmlFor="user-password"> كلمة المرور   </label>
                      <input type="text" id='user-password' />
                   </div>
            </div>
            
            
            <div className="btns">
                <div className="btn"> تسجيل </div>
                <Link to='/forgot-password'> نسيت كلمة المرور ؟</Link>
            </div>
        </form>
    </div>
  )
}

export default Login