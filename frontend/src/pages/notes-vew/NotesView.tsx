import { useSearchParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Nav from "../../components/Navbar/Nav";
import "./NotesView.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/reduxHook";
import { getTeacherFiles } from "../../utils/teacher";
import { NoteInterface } from "../../types/index.types";
import CustomLoading from "../loading/CustomLoading";
import PdfViewerComponent from "../../components/pdfviewer/PdfViewer";

const NotesView = () => {
  const [searchParams] = useSearchParams();
  const [allFiles, setAllFiles] = useState<NoteInterface[]>([]);
  const id = Number(searchParams.get("id"));
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state) => state.token.token);

  const getAllFiles = async () => {
    setLoading(true);
    try {
      const fils = await getTeacherFiles(token, id);
      setAllFiles(fils);
    } catch (err) {
      setAllFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFiles();
  }, [id]);

  const showNote = (path: string) => {
    console.log(path);
  };

  return (
    <div>
      <Nav />
      <div className="all-notes main-container">
        {loading && <CustomLoading />}
        <h1> المذكرات </h1>

        <div className="notes">
          {allFiles.length > 0 ? (
            allFiles.map((file, index) => (
              <div
                key={file.course_id}
                className="custom-note"
                onClick={() => showNote(file.file_path)}
              >
                <span className="num"> ({index + 1}) </span>
                <div className="title"> {file.title} </div>
              </div>
            ))
          ) : (
            <h2> لا يوجد مذكرات </h2>
          )}
        </div>
      </div>
      <PdfViewerComponent />
      <Footer />
    </div>
  );
};

export default NotesView;
