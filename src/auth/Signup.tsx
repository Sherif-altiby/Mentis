import { Link } from "react-router-dom";
import "./auth.scss";
import { useState } from "react";
import Circles from "../components/animation/Circles";
import { register } from "../utils/api";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
 
  const navigate = useNavigate()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNumber, setUserNumber] = useState('');
  const [parentNumber, setParentNumber] = useState('');

  const [nameValidate, setNameValidate] = useState(true);
  const [userNameValidate, setUserNameValidate] = useState(true);
  const [userEmailValidate, setUserEmailValidate] = useState(true);
  const [passwordValidate, setPasswordValidate] = useState(true);
  const [userNumberValidate, setUserNumberValidate] = useState(true);
  const [parentNumberValidate, setParentNumberValidate] = useState(true);

  const handleSignup = async () => {
    const isValidEmail = emailRegex.test(userEmail);

    if (name.trim().length == 0) { setNameValidate(false); }

    if (userName.trim().length == 0) { setUserNameValidate(false); }

    if (!isValidEmail) { setUserEmailValidate(false);  }

    if (password.trim().length == 0) { setPasswordValidate(false);  }

    if (String(userNumber).length < 9) { setUserNumberValidate(false); }

    if (String(parentNumber).length  < 9) { setParentNumberValidate(false);}

    if(nameValidate && userNameValidate && passwordValidate && userEmailValidate && userNumberValidate && parentNumberValidate){
       
        const data = await register({name: userName, email: userEmail, password, phone_number: userNumber, role: "student"});

        if(data){
          localStorage.setItem('mentisID', data.token);
          navigate('/')
        }

      } else{
       console.log("Reisteration is not successfully")
    }

  };

  return (
    <div className="signup">
      <Circles />
      <form action="">
        <h1> تسجيل حساب جديد </h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="full-name"> الاسم بالكامل رباعي </label>
            <input
              onChange={(e) => {setName(e.target.value); setNameValidate(true)}}
              type="text"
              id="full-name"
              className={nameValidate ? "" : "error"}
            />
          </div>
          <div className="input">
            <label htmlFor="user-name"> اسم المستخدم </label>
            <input
              onChange={(e) => {setUserName(e.target.value); setUserNameValidate(true)}}
              type="text"
              id="user-name"
              className={userNameValidate ? "" : "error"}
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="emil-name"> البريد الالكتروني </label>
            <input
              onChange={(e) => {setUserEmail(e.target.value); setUserEmailValidate(true)}}
              type="text"
              id="emil-name"
              className={userEmailValidate ? "" : "error"}
            />
          </div>
          <div className="input">
            <label htmlFor="user-password"> كلمة المرور </label>
            <input
              onChange={(e) => {setPassword(e.target.value); setPasswordValidate(true)}}
              type="text"
              id="user-password"
              className={passwordValidate ? "" : "error"}
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="wats-number"> رقم الواتس اب </label>
            <input
              onChange={(e) => {setUserNumber(e.target.value); setUserNumberValidate(true)}}
              type="number"
              id="wats-number"
              className={userNumberValidate ? "" : "error"}
            />
          </div>
          <div className="input">
            <label htmlFor="parent-wats"> رقم الواتس اب ولي الامر </label>
            <input
              onChange={(e) => {setParentNumber(e.target.value); setParentNumberValidate(true)}}
              type="number"
              id="parent-wats"
              className={parentNumberValidate ? "" : "error"}
            />
          </div>
        </div>
        <div className="btns">
          <div className="btn" onClick={handleSignup}>
            تسجيل 
          </div>
          <Link to="/login"> لديك حساب بالفعل ؟</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
