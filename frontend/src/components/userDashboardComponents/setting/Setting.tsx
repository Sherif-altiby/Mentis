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

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) { setImagePreviewUrl(URL.createObjectURL(file)); }
  };

   

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
                {imagePreviewUrl ? (  <img src={imagePreviewUrl} alt="" />  ) : (<CiUser />)}
              </div>
              <div className="text">
                <h5> صورتك الشخصية </h5>
                <p>
                  الصورة الشخصية لازم تكون بصيغة jpg, jpeg, png و متكونش اكبر من
                  800px طول او عرض
                </p>
                <div className="btns-img">
                  <div className="btn">
                    <IoCloudUploadOutline />
                    <label htmlFor="file"> file </label>
                    <input type="file"  id="file" onChange={handleImageChange} />
                  </div>
                  <div className="btn">
                    <MdDelete />
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
                <label htmlFor="new-pass"> كلمة المرور الجديدة</label>
                <input type="password" id="new-pass" />
              </div>
              <div className="input">
                <label htmlFor="new-confirm-pass"> تأكيد كلمة المرور الجديدة</label>
                <input type="password" id="new-confirm-pass" />
              </div>
            </div>

            <div className="save-btn"> حفظ </div>
          </div>

          <div className="general-setting">
            <h3 className="sec-header"> إعدادات عامة </h3>

            <div className="input-container">
              <div className="input">
                <label htmlFor="name"> الإسم </label>
                <input type="text" id="name" placeholder={userInfo?.name} />
              </div>
              <div className="input">
                <label htmlFor="email"> البريد الإلكتروني </label>
                <input type="text" id="email" placeholder={userInfo?.email} />
              </div>
            </div>

            <div className="input-container">
              <div className="input">
                <label htmlFor="phone"> رقم الواتس اب </label>
                <input type="number" id="phone" placeholder={userInfo?.phone_number} />
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
