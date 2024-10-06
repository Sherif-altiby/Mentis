import "./setting.scss";

import Loading from "../../../pages/loading/Loading";
import { useAppSelector } from "../../../redux/reduxHook";

const Setting = () => {
  const loading = useAppSelector((state) => state.loading.isLoading);

  const userInfo = useAppSelector((state) => state.userInfo.userInfo);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`setting-user `}>
          <h1> الإعدادات </h1>

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
                <label htmlFor="new-confirm-pass">
                  تأكيد كلمة المرور الجديدة
                </label>
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
                <input
                  type="number"
                  id="phone"
                  placeholder={userInfo?.phone_number}
                />
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
