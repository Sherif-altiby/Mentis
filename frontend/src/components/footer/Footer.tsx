import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div>
      <footer className={``}>
         
        <div className="copy-wright">
          <p>
          <Link to="/" > CraftyCode </Link>
          . جميع الحقوق محفوظة  © 2024.تنفيذ و تطوير
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
