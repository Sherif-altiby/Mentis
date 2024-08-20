import CountUp from 'react-countup';
import { useAppSelector } from "../../../redux/reduxHook"
import { Link } from "react-router-dom";
import './TeacherNotes.scss'
import { useState } from 'react';
import { uploadFile } from '../../../utils/teacher';

const TeacherNotes = () => {

  const appMode = useAppSelector((state) => state.mentisusertheme.mentisUserTheme);
  const token = useAppSelector((state) => state.token.token);
  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id)

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
 };

 const handleUpload = async () => {
  if (selectedFile && fileName.length > 0 ) {
      try {
          const response = await uploadFile(token, fileName, "pdf", selectedFile, userId);
          console.log('File uploaded successfully:', response);
      } catch (error) {
          console.error('File upload failed:', error);
      }
  } else {
      console.log('No file selected');
  }
};

  return (
    <div>
        <h1> المذكرات </h1>
        <div className={`teacher-notes ${appMode} `}>
            <div className="all-teacher-notes">
                <h3> عدد المذكرات التي قمت بإضافتها </h3>
                <p><span> مذكرة </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span>  </p>
            </div>
            <div className="notes-levels">
                <Link to='#'> <p> أولى ثانوي  </p> <p> <span> مذكرة </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
                <Link to='#'> <p> ثانية ثانوي </p> <p> <span> مذكرة </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
                <Link to='#'> <p> ثالثة ثانوي </p> <p> <span> مذكرة </span> <span className='counter-up-number'> <CountUp start={0} end={100} duration={2} /> </span> </p> </Link>
            </div>
            <div className="add-note">
              <h3> إضافة مذكرة </h3>
              <div className="inputs">
                  <div className="input">
                    <label htmlFor="name-note"> إسم المذكرة </label>
                    <input type="text" id='name-note' onChange={((e) => setFileName(e.target.value))} />
                  </div>
                  <div className="input">
                    <label htmlFor="file"> اضف ملف </label>
                    <input type="file" id='file' onChange={handleFileChange}  /> 
                  </div>
              </div>
              <div className="btn" onClick={handleUpload} > حفظ </div>
            </div>
        </div>
    </div>
  )
}

export default TeacherNotes