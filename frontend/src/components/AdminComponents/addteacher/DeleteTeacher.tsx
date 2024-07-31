
import './AddTeacher.scss'

const DeleteTeacher = () => {
  return (
    <div className='admin-add-teacher' >
         <div className="card">
            <h1> حذف مدرس </h1>
             
             <div className="card-add">
                <div className="input">
                    <label htmlFor="name"> إسم المدرس </label>
                    <input type="text" id='name' />
                </div>
                 
             <div className="btn"> حذف </div>
             </div>

         </div>
    </div>
  )
}

export default DeleteTeacher