import { Link } from 'react-router-dom';
import './auth.scss' ;
import { useState } from 'react';


const Signup = () => {
 
   const [name, setName] = useState('');
   const [userName, setUserName] = useState('');
   const [userEmail, setUserEmail] = useState('');
   const [password, setPassword] = useState('');
   const [userNumber, setUserNumber] = useState(0);
   const [parentNumber, setParentNumber] = useState(0);

   const handleSignup =() => {
      console.log(name, userName, userEmail, password, userNumber, parentNumber)
   }

  return (
    <div  className='signup' >
        <form action="">
            <h1> تسجيل حساب جديد </h1>
            <div className="input-container">
                   <div className="input">
                      <label htmlFor="full-name"> الاسم بالكامل رباعي   </label>
                      <input onChange={(e) => setName(e.target.value)} type="text" id='full-name'   />
                   </div>
                   <div className="input">
                      <label htmlFor="user-name"> اسم المستخدم   </label>
                      <input onChange={(e) => setUserName(e.target.value)} type="text" id='user-name'  />
                   </div>
            </div>
            <div className="input-container">
                   <div className="input">
                      <label htmlFor="emil-name"> البريد الالكتروني   </label>
                      <input onChange={(e) => setUserEmail(e.target.value)} type="text" id='emil-name'/>
                   </div>
                   <div className="input">
                      <label htmlFor="user-password"> كلمة المرور   </label>
                      <input onChange={(e) => setPassword(e.target.value)} type="text" id='user-password' />
                   </div>
            </div>
            <div className="input-container">
                   <div className="input">
                      <label htmlFor="wats-number">  رقم الواتس اب   </label>
                      <input onChange={(e) => setUserNumber(Number(e.target.value))} type="number" id='wats-number'/>
                   </div>
                   <div className="input">
                      <label htmlFor="parent-wats">   رقم الواتس اب ولي الامر </label>
                      <input onChange={(e) => setParentNumber(Number(e.target.value))} type="number" id='parent-wats' />
                   </div>
            </div>
            <div className="btns">
                <div className="btn" onClick={handleSignup} > تسجيل </div>
                <Link to='/login'> لديك حساب بالفعل ؟</Link>
            </div>
        </form>
    </div>
  )
}

export default Signup