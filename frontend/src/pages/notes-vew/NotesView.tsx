import { useSearchParams } from "react-router-dom";
import Footer from "../../components/footer/Footer"
import Nav from "../../components/Navbar/Nav";
import './NotesView.scss'
import { useEffect } from "react";
import { useAppSelector } from "../../redux/reduxHook";
import { getFiles } from "../../utils/api";

const NotesView = () => {

  const [searchParams] = useSearchParams();

  const id = Number(searchParams.get('id'));

  const token = useAppSelector((state) => state.token.token)

  useEffect(() => {
    try{
      const files = getFiles(token, id)
    console.log(files)
    }catch(e) {
      console.log(e)
    }
  }, [id])

  return (
    <div>
        <Nav />
           <div className="all-notes"></div>
        <Footer />
    </div>
  )
}

export default NotesView