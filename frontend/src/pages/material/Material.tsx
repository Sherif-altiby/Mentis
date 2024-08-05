import './Material.scss';

import { useParams } from "react-router-dom"
import MainHeader from "../../components/mainheader/MainHeader"


import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const Material = () => {
 
    const { materialId } = useParams()

    const query = useQuery();
    const searchQuery = query.get('query');
    const id = query.get('id');

    console.log(id, searchQuery)

  return (
    <div className="material-page">
         <MainHeader title={materialId ? materialId : ''} />
         <div className="material-teachers">
          </div>
    </div>
  )
}

export default Material