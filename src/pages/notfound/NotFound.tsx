 import './NotFound.scss';
 import { useNavigate } from 'react-router-dom';


const NotFound = () => {

    const navigate = useNavigate();


    const goBack = () => {
        navigate(-1); 

    }
     
  return (
    <div className="notfound" >
         <h1> هذة الصفحة ليست موجوة  </h1>
          <div className="btn" onClick={goBack} > الصفحة السابقة </div>
    </div>
  )
}

export default NotFound