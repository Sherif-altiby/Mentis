
const ForgotPassword = () => {
    return (
        <div  className='signup' >
            <form action="">
                <h1>  نسيت كلمة المرور </h1>
                <div className="input-container">
                       <div className="input">
                          <label htmlFor="arabic-name"> البريد الالكتروني  </label>
                          <input type="text" id='arabic-name'   />
                       </div>
                </div>
                <div className="btns">
                    <div className="btn"> ارسال </div>
                 </div>
            </form>
        </div>
      )
}

export default ForgotPassword