import "./setting.scss";
import { CiUser } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/ContextProvider";
import { getUserInfo } from "../../../utils/api";
import Loading from "../../../pages/loading/Loading";

type userInfo = {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  user_id: number;
};

const Setting = () => {
  const { token, loading, setLoading } = useAppContext();

  const [userInfo, setUserInfo] = useState<userInfo>();

  useEffect(() => {
    if (token) {
      setLoading(true);

      const userInfo = async () => {
        const data = await getUserInfo(token);
        setUserInfo(data);
        console.log(data);
        setLoading(false);
      };

      userInfo();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="setting-user">
          <h1> الإعدادات </h1>

          <div className="setting-user-img">
            <h3 className="sec-header"> تحديث صورة الملف الشخصي </h3>
            <div className="img-container">
              <div className="img">
                {" "}
                <CiUser />{" "}
              </div>
              <div className="text">
                <h5> صورتك الشخصية </h5>
                <p>
                  {" "}
                  الصورة الشخصية لازم تكون بصيغة jpg, jpeg, png و متكونش اكبر من
                  800px طول او عرض
                </p>
                <div className="btns-img">
                  <div className="btn">
                    {" "}
                    <IoCloudUploadOutline />{" "}
                  </div>
                  <div className="btn">
                    {" "}
                    <MdDelete />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="save-btn"> حفظ </div>
          </div>

          <div className="change-password">
            <h3 className="sec-header"> تغيير كلمة المرور </h3>

            <div className="input">
              <label htmlFor="old-pass"> كلمة المرور القديمة </label>
              <input type="password" id="old-pass" />
            </div>

            <div className="input-container">
              <div className="input">
                <label htmlFor="old-pass"> كلمة المرور الجديدة</label>
                <input type="password" id="old-pass" />
              </div>
              <div className="input">
                <label htmlFor="old-pass"> تأكيد كلمة المرور الجديدة</label>
                <input type="password" id="old-pass" />
              </div>
            </div>

            <div className="save-btn"> حفظ </div>
          </div>

          <div className="general-setting">
            <h3 className="sec-header"> إعدادات عامة </h3>

            <div className="input-container">
              <div className="input">
                <label htmlFor="name"> الإسم </label>
                <input type="text" id="name" value={userInfo?.name} />
              </div>
              <div className="input">
                <label htmlFor="email"> البريد الإلكتروني </label>
                <input type="text" id="email" value={userInfo?.email} />
              </div>
            </div>

            <div className="input-container">
              <div className="input">
                <label htmlFor="name"> رقم الواتس اب </label>
                <input type="text" id="name" value={userInfo?.phone_number} />
              </div>
            </div>

            <div className="save-btn"> حفظ </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
