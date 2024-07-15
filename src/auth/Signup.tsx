import { Link } from 'react-router-dom';
import './auth.scss' ;


const Signup = () => {
  return (
    <div  className='signup' >
        <form action="">
            <h1> تسجيل حساب جديد </h1>
            <div className="input-container">
                   <div className="input">
                      <label htmlFor="arabic-name"> الاسم بالكامل رباعي   </label>
                      <input type="text" id='arabic-name'   />
                   </div>
                   <div className="input">
                      <label htmlFor="user-name"> اسم المستخدم   </label>
                      <input type="text" id='user-name'  />
                   </div>
            </div>
            <div className="input-container">
                   <div className="input">
                      <label htmlFor="emil-name"> البريد الالكتروني   </label>
                      <input type="text" id='emil-name'/>
                   </div>
                   <div className="input">
                      <label htmlFor="user-password"> كلمة المرور   </label>
                      <input type="text" id='user-password' />
                   </div>
            </div>
            <div className="input-container">
                   <div className="input">
                      <label htmlFor="wats-number">  رقم الواتس اب   </label>
                      <input type="number" id='wats-number'/>
                   </div>
                   <div className="input">
                      <label htmlFor="parent-wats">   رقم الواتس اب ولي الامر </label>
                      <input type="number" id='parent-wats' />
                   </div>
            </div>
            <div className="btns">
                <div className="btn"> تسجيل </div>
                <Link to='/login'> لديك حساب بالفعل ؟</Link>
            </div>
        </form>
    </div>
  )
}

export default Signup