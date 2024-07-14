import { useParams } from "react-router-dom"


const Material = () => {
 
    const { materialId } = useParams()

  return (
    <div> {materialId} </div>
  )
}

export default Material