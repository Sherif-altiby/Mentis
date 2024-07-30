 import './AddTeacher.scss'


const AddTeacher = () => {
  return (
    <div className='admin-add-teacher' >
         <div className="card">
            <h1> إضافة مدرس </h1>
             
             <div className="card-add">
                <div className="input">
                    <label htmlFor="name"> إسم المدرس </label>
                    <input type="text" id='name' />
                </div>
                <div className="input">
                    <label htmlFor="subject"> إسم المادة </label>
                    <input type="text" id='subject' />
                </div>
                <div className="input">
                    <label htmlFor="phone"> رقم التلفون </label>
                    <input type="number" id='phone' />
                </div>
             <div className="btn"> إضافة </div>
             </div>

         </div>
    </div>
  )
}

export default AddTeacher