import './Material.scss';

import { useParams } from "react-router-dom"
import MainHeader from "../../components/mainheader/MainHeader"
import CreateTeacherCard from "../../components/createTeacherCard/CreateTeacherCard"


const Material = () => {
 
    const { materialId } = useParams()

  return (
    <div className="material-page">
         <MainHeader title={materialId ? materialId : ''} />
         <div className="material-teachers">
            <CreateTeacherCard />
            <CreateTeacherCard />
            <CreateTeacherCard />
            <CreateTeacherCard />
            <CreateTeacherCard />
            <CreateTeacherCard />
            <CreateTeacherCard />
         </div>
    </div>
  )
}

export default Material