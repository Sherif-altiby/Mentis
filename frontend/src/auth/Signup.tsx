import { Link } from "react-router-dom";
import "./auth.scss";
import { useState } from "react";
import Circles from "../components/animation/Circles";
import { register } from "../utils/api";
import { useNavigate } from 'react-router-dom';
import Loading from "../pages/loading/Loading";

import { setToken } from "./tokenSlice";

import { setLoading } from "../pages/loading/Loadingslice";
import { useAppDispatch, useAppSelector } from "../redux/reduxHook";

const Signup: React.FC = () => {
  const navigate = useNavigate();
 
  const loading = useAppSelector((state) => state.loading.isLoading);
  const dispatch = useAppDispatch()

  const [userName, setUserName] = useState("");
  const [parentName, setParentName] = useState("");
  const [userNumber, setUserNumber] = useState('');
  const [parentNumber, setParentNumber] = useState('');

  const [userNameValidate, setUserNameValidate] = useState(true);
  const [parentNameValidate, setParentNameValidate] = useState(true);
  const [userNumberValidate, setUserNumberValidate] = useState(true);
  const [parentNumberValidate, setParentNumberValidate] = useState(true);

  const [errorMessage, setErrorMessage] = useState('حاول مرة اخري')

  const [error, setError] = useState(false);

  const handleSignup = async () => {

    if (userName.length > 0 && parentName.length> 0 && userNumber.length > 0 && parentNumber.length > 0) {
      dispatch(setLoading(true))

        const data = await register({
          userName,
          userPhone: userNumber,
          parentName,
          parentPhone: parentNumber,
          role: "student"
        });

        console.log(data)

        if (!data.error) {
          dispatch(setToken(data.token));
          dispatch(setLoading(false));
          navigate('/');
        } else {
          dispatch(setLoading(false));
          setError(true);

          if(data.message === "Validation failed"){
             setErrorMessage("هذا الحساب موجود بالفعل")
          }else if(data.message === "Parent phone number is required and must be unique"){
            setErrorMessage("رقم الواتس اب مطابق لرقم الواتس اب ولي الامر")
            console.log("fdkjndkjf")
          }
        }
        
    }else{
      setUserNameValidate(userName.length > 0);
      setParentNameValidate(parentName.length > 0);
      setUserNumberValidate(userNumber.length >= 9);
      setParentNumberValidate(parentNumber.length >= 9);
    }
  };

  return (
    <div className="signup">
      <Circles />
      {loading ? (
        <Loading />
      ) : (
        <form>
          <h3 className="error">{error ? errorMessage : null}</h3>
          <h1>تسجيل حساب جديد</h1>
          <div className="input-container">
            <div className="input">
              <label htmlFor="full-name">إسم الطالب</label>
              <input
                onChange={(e) => { setUserName(e.target.value); setUserNameValidate(true); }}
                type="text"
                id="full-name"
                value={userName}
                className={userNameValidate ? "" : "error"}
              />
            </div>
            <div className="input">
              <label htmlFor="user-name">اسم ولي الأمر</label>
              <input
                onChange={(e) => { setParentName(e.target.value); setParentNameValidate(true); }}
                type="text"
                id="user-name"
                value={parentName}
                className={parentNameValidate ? "" : "error"}
              />
            </div>
          </div>

          <div className="input-container">
            <div className="input">
              <label htmlFor="wats-number">رقم الواتس اب</label>
              <input
                onChange={(e) => { setUserNumber(e.target.value); setUserNumberValidate(true); }}
                type="number"
                id="wats-number"
                value={userNumber}
                className={userNumberValidate ? "" : "error"}
              />
            </div>
            <div className="input">
              <label htmlFor="parent-wats">رقم الواتس اب ولي الامر</label>
              <input
                onChange={(e) => { setParentNumber(e.target.value); setParentNumberValidate(true); }}
                type="number"
                id="parent-wats"
                value={parentNumber}
                className={parentNumberValidate ? "" : "error"}
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="grade"> الصف الدراسي </label>
            <select name="grade" id="grade">
              <option value="1"> الصف الاول الثانوي </option>
              <option value="2"> الصف الثاني الثانوي </option>
              <option value="3"> الصف الثالث الثانوي </option>
            </select>
          </div>
          <div className="btns">
            <div className="btn" onClick={handleSignup}>
              تسجيل
            </div>
            <Link to="/login">لديك حساب بالفعل؟</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
