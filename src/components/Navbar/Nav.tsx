import "./Nav.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAppContext } from "../../context/ContextProvider";


import logo from "../../assets/logo-2.png";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/api";
import Loading from "../../pages/loading/Loading";

type userInfo = {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  user_id: number
}

const Nav = () => {

  const navigate = useNavigate();
  const {token, loading, setLoading} = useAppContext();

  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfo>()

  useEffect(() => {
   
    if(token){
       setLoading(true)
       
      const userInfo = async () => {
        const data = await getUserInfo(token)
        setUserInfo(data)
        setLoading(false)
      }

      userInfo()
    } else {
      setLoading(false)
    }

  }, [])

  const handleNavigate = ( path: string ) => {
    setShowMenu(false)
    navigate(path)
  }

  const handleLogout = () => {
     localStorage.removeItem('mentisID');
     navigate("/");
     window.location.reload()
  }

  return (
    <nav>
      {
        loading ? (<Loading />) : (
          <div className="nav">
        {token ? (
      <>  
          <div className="nav-user" onClick={() => setShowMenu(!showMenu)} >
               <div className="user-img"> <FaCircleUser /> </div>
               <div className="user-name"> {userInfo?.name} </div>
               <div className="user-notifications">
                   <IoNotifications />
                   <span> 0 </span>
               </div>
          </div>
          <div className={`user-menu ${showMenu ? 'show' : ' ' }`}>
              <div className="user-menu-link" onClick={() => handleNavigate("/user/user-profile/dashboard")} > <p>لوحة التحكم </p> <div className="icon"> <FaRegCompass /> </div> </div>
              <div className="user-menu-link" onClick={() => handleNavigate("/user/user-profile/setting")} > <p>  اللإعدادات </p> <div className="icon"> <IoSettings /> </div> </div>
              <div className="user-menu-link" onClick={handleLogout} > <p> تسجيل الخروج </p> <div className="icon"> <RiLogoutCircleLine /> </div> </div>
          </div>
      </>
        ) : (
          <div className="signin">
            <div className="btn">
              <Link to="/signup"> تسجيل الدخول </Link>
            </div>
          </div>
        )}
        <div className="logo">
          <Link to="/">
            <div className="img">
              <img src={logo} alt="" />
            </div>
          </Link>
        </div>
      </div>
        )
      }
    </nav>
  );
};

export default Nav;
