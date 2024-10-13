import "./Nav.scss";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../redux/reduxHook";
import { setLoading } from "../../pages/loading/Loadingslice";

import logo from "../../assets/logo-2.png";

import { getUserInfo } from "../../utils/api";
import Loading from "../../pages/loading/Loading";

import { setUserInfo } from "./userInfo";
import { setDarkTheme } from "../userDashboardComponents/setting/settingSlice";
import { HiBars3 } from "react-icons/hi2";
import { NavProps } from "../../types/index.types";

const Nav: React.FC<NavProps> = ({ showIcon, showMenu, setShowMenu }) => {
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.loading.isLoading);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.token);
  const appMode = useAppSelector(
    (state) => state.mentisusertheme.mentisUserTheme
  );
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    const fetchUserInfo = async ({ token }: { token: string }) => {
      if (userInfo.name.length === 0) {
        try {
          dispatch(setLoading(true));
          const data = await getUserInfo(token);
          dispatch(setUserInfo(data));

          console.log(data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    if (token) {
      fetchUserInfo({ token });
    }
  }, [token]);

  const handleNavigate = () => {
    if (userInfo.role === "student") {
      navigate(`/user/user-profile`);
    } else if (userInfo.role === "teacher") {
      navigate(`/teacher/dashboard/controle`);
    } else if (userInfo.role === "admin") {
      navigate(`/admin/dashboard/controle`);
    }
  };

  const handlDarkMode = () => {
    dispatch(setDarkTheme());
  };

  return (
    <nav>
      {loading ? (
        <Loading />
      ) : (
        <div className={`nav  `}>
          {token ? (
            <>
              <div className="nav-user">
                <div
                  className="user-name user-name-item"
                  onClick={() => handleNavigate()}
                >
                  <p>
                    {userInfo?.name[0].toUpperCase()}
                    {userInfo?.name[1].toUpperCase()}
                  </p>
                </div>
                <div className="user-notification user-name-item">
                  <div className="icon">
                    <IoIosNotificationsOutline />
                  </div>
                </div>
                <div
                  className="dark-mode user-name-item"
                  onClick={handlDarkMode}
                >
                  {appMode === "dark" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-brightness-high"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-moon"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                    </svg>
                  )}
                </div>
                {showIcon && (
                  <div className="user-name-item">
                    <div
                      className="icon"
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <HiBars3 />
                    </div>
                  </div>
                )}
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
