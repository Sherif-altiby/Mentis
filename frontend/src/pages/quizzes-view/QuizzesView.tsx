import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHook"
import { getAllQuizzes } from "../../utils/api";
import { setLoading } from "../loading/Loadingslice";
import Nav from "../../components/Navbar/Nav";
import Footer from "../../components/footer/Footer";
import Loading from "../loading/Loading";
import { quizeProps } from "../../types/index.types";
import './QuizzesView.scss'

const QuizzesView = () => {
    const dispatch = useAppDispatch()
 
    const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme);
    const loading = useAppSelector((state) => state.loading.isLoading);
    const token   = useAppSelector((state) => state.token.token);

    const [allQuizzes, setAllQuizzes] = useState<quizeProps[]>([])

    const getQuizzes = async (token: string | null) => {
       dispatch(setLoading(true))
       const response = await getAllQuizzes(token);

       if(response){
         setAllQuizzes(response);
         dispatch(setLoading(false))
       }else{
        dispatch(setLoading(false))
        console.log("error")
       }
    }

    useEffect(() => {
        getQuizzes(token)
    }, [token])

  return (
    <div>
     <Nav />
     {loading ? (<Loading />) : (
        <div  className={`all-qizzes-section ${appMode}`} >
            {allQuizzes.length > 0 ? (
                allQuizzes.map((quize) => (
                    <div className="quize" key={quize.id} >
                        {quize.title}
                    </div>
                ))
            ) : (<h3> no </h3>)}
        </div>
      )}
     <Footer />
    </div>
  )
}

export default QuizzesView