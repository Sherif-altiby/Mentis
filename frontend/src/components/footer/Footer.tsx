import { Link } from "react-router-dom"
import './Footer.scss'
import { useAppSelector } from "../../redux/reduxHook"
 
const Footer = () => {
 
  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme)

  return (
    <div>
        <footer className={`${appMode}`} >
            <div className="links">
                <Link to='/' > شروط الالستخدام </Link>
                <Link to='/' > سياية الخصوصية </Link>
                <Link to='/' > من نحن </Link>
                <Link to='/' >  مساعدة </Link>
            </div>
            <div className="copy-wright">
                   . © 2024 جميع الحقوق محفوظة .تنفيذ و تطوير  
            </div>
        </footer>
    </div>
  )
}

export default Footer