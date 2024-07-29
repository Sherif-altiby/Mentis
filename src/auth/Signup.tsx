import { Link } from "react-router-dom";
import "./auth.scss";
import { useState } from "react";
import Circles from "../components/animation/Circles";
import { register } from "../utils/api";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/ContextProvider";
import Loading from "../pages/loading/Loading";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, loading, setLoading } = useAppContext();

  const [userName, setUserName] = useState("");
  const [parentName, setParentName] = useState("");
  const [userNumber, setUserNumber] = useState('');
  const [parentNumber, setParentNumber] = useState('');

  const [userNameValidate, setUserNameValidate] = useState(true);
  const [parentNameValidate, setParentNameValidate] = useState(true);
  const [userNumberValidate, setUserNumberValidate] = useState(true);
  const [parentNumberValidate, setParentNumberValidate] = useState(true);

  const [error, setError] = useState(false);

  const handleSignup = async () => {
    setUserNameValidate(userName.length > 0);
    setParentNameValidate(parentName.length > 0);
    setUserNumberValidate(userNumber.length >= 9);
    setParentNumberValidate(parentNumber.length >= 9);

    if (userNameValidate && parentNameValidate && userNumberValidate && parentNumberValidate) {
      setLoading(true);

      try {
        const data = await register({
          userName,
          userPhone: userNumber,
          parentName,
          parentPhone: parentNumber,
          role: "student"
        });

        if (data.status === "success") {
          setToken(data.token);
          setLoading(false);
          navigate('/');
        } else {
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <div className="signup">
      <Circles />
      {loading ? (
        <Loading />
      ) : (
        <form>
          <h3 className="error">{error ? "Something is wrong" : null}</h3>
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
