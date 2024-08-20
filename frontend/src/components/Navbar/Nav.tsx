import "./Nav.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { setLoading } from "../../pages/loading/Loadingslice";

import logo from "../../assets/logo-2.png";

import { getUserInfo, logout } from "../../utils/api";
import Loading from "../../pages/loading/Loading"; 
 
import { setUserInfo } from "./userInfo";


const Nav = () => {
  
  const navigate = useNavigate();
  
  const loading = useAppSelector((state) => state.loading.isLoading);
  const dispatch = useAppDispatch()
  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme);

  const token = useAppSelector((state) => state.token.token)

  const userInfo = useAppSelector((state) => state.userInfo.userInfo)

  const [showMenu, setShowMenu] = useState(false);
 
  useEffect(() => {
   
    const fetchUserInfo = async ({token}: {token: string}) => {

      if(userInfo.name.length === 0){
        try {
          dispatch(setLoading(true));
          const data = await getUserInfo(token);
                dispatch(setUserInfo(data))
             
            console.log(data);
          
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
            dispatch(setLoading(false));
         }
      }
     
    };
  
    if (token) {
      fetchUserInfo({token});
    }
  
  }, [token]);
  

  const handleNavigate = ( path: string ) => {
    setShowMenu(false)

    if(userInfo.role === "student"){
      navigate(`/user/user-profile/${path}`)
    } else if(userInfo.role === "teacher"){
      navigate(`/teacher/dashboard/controle/${path}`)
    }else if(userInfo.role === "admin"){
      navigate(`/admin/dashboard/controle/${path}`)
    }
  }

  const handleLogout = async () => {
     dispatch(setLoading(true))
    //  await logout(token)
     navigate("/");
     localStorage.clear()
     window.location.reload()
     dispatch(setLoading(false))
  }

  return (
    <nav>
      {
        loading ? (<Loading />) : (
          <div className={`nav ${appMode} `}>
        {token ? (
      <>  
          <div className="nav-user" onClick={() => setShowMenu(!showMenu)} >
               <div className="user-img"> <FaCircleUser /> </div>
               <div className="user-name"> {userInfo?.name} </div>
          </div>
          <div className={`user-menu ${showMenu ? 'show' : ' ' }`}>
              <div className="user-menu-link" onClick={() => handleNavigate("dashboard")} > <p>لوحة التحكم </p> <div className="icon"> <FaRegCompass /> </div> </div>
              <div className="user-menu-link" onClick={() => handleNavigate("settings")} > <p>  اللإعدادات </p> <div className="icon"> <IoSettings /> </div> </div>
              <div className="user-menu-link" onClick={() => handleNavigate("notifications")} > <p>  الاشعارات </p> <div className="icon"> <IoNotifications /> </div> </div>
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
        )}
    </nav>
  );
};

export default Nav;
