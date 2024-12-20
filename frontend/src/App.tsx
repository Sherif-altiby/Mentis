import "./App.scss";
import "./dark-mode.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Material from "./pages/material/Material";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Main from "./components/Main/Main";
import Home from "./pages/Home/Home";
import ForgotPassword from "./auth/ForgotPassword";
import Teacher from "./pages/teacher/Teacher";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute ";
import NotFound from "./pages/notfound/NotFound";
import StudentProfile from "./pages/studentdashboard/StudentDashboard";
import Dashboard from "./components/userDashboardComponents/Dashboard/Dashboard";
import Lecture from "./components/userDashboardComponents/lecture/Lecture";
import Quizes from "./components/userDashboardComponents/quizes/Quizes";
import Books from "./components/userDashboardComponents/books/Books";
import Setting from "./components/userDashboardComponents/setting/Setting";
import Admin from "./pages/admin/Admin";
import AddTeacher from "./components/AdminComponents/addteacher/AddTeacher";
import DeleteTeacher from "./components/AdminComponents/addteacher/DeleteTeacher";
import TeacherDashboard from "./pages/teacherDashboard/TeacherDashboard";
import Courses from "./components/TeacherComponents/courses/Courses";
import TeacherDashboardComponent from "./components/TeacherComponents/teacherdashboard/TeacherDashboardComponent";
import TeacherStudent from "./components/TeacherComponents/teacherstudents/TeacherStudent";
import TeacherNotes from "./components/TeacherComponents/teachernotes/TeacherNotes";
import TeacherQuizes from "./components/TeacherComponents/teacherquizes/TeacherQuizes";
import AddCourse from "./components/AdminComponents/addcourse/AddCourse";
import Notifications from "./components/notificationscomponent/Notifications";
import VideoPlayer from "./pages/videoplayer/VideoPlayer";
import AllQuizes from "./components/TeacherComponents/teacherquizes/AllQuizes";
import AllVideos from "./pages/videoplayer/AllVideos";
import QuizzesViewQuestions from "./pages/quizzes-view/QuizzesViewQuestions";
import NotesView from "./pages/notes-vew/NotesView";
import UpdateCourse from "./components/TeacherComponents/courses/UpdateCourse";
import QuizzesView from "./pages/quizzes-view/QuizzesView";
import LevelQuizzes from "./components/TeacherComponents/teacherquizes/LevelQuizzes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/reduxHook";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/scrollTop/ScrollToTop";
import UpdateNotes from "./components/TeacherComponents/teachernotes/UpdateNotes";
import Students from "./components/AdminComponents/students/Students";
import NotAllowed from "./pages/notfound/notAllowed";
import BlockedUsers from "./components/AdminComponents/blockedusers/BlockedUsers";
import { isUserBlocked } from "./utils/api";
import { setIsBlocked } from "./components/AdminComponents/blockedusers/isUserBlockedSlice";
import Aboutus from "./pages/about-us/Aboutus";

const App = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch()

  useEffect(() => { AOS.init({ once: true }); }, []);

  const appMode = useAppSelector( (state) => state.mentisusertheme.mentisUserTheme );

  const token = useAppSelector((state) => state.token.token);

  const userId = useAppSelector((state) => state.userInfo.userInfo.user_id);

  const isBlocked = useAppSelector((state) => state.isBlocked.isBlocked)

  const getIsUserBlocked = async () => {
    const res = await isUserBlocked(token, userId)


   dispatch(setIsBlocked(res.blocked))

  }

  useEffect(() => { if(isBlocked) { navigate('/not-allowed') }}, [isBlocked])

  useEffect(() => {getIsUserBlocked()}, [])

  return (
    <div className={`main-app ${appMode}`}>
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Home />}>
            <Route index element={<Main />} />
            <Route path="material/:materialId" element={<ProtectedRoute element={Material} />} />
            <Route path="teacher/:teacherId" element={<ProtectedRoute element={Teacher} />} />
            <Route path="/aboutus" element={<Aboutus />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />

          {/* STUDENT DASHBOARD ROUTES*/}
           <Route path="/user/user-profile" element={<ProtectedRoute element={StudentProfile} />} >
            <Route index element={<ProtectedRoute element={Dashboard} />} />
            <Route path="dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="lectures" element={<ProtectedRoute element={Lecture} />} />
            <Route path="quizes" element={<ProtectedRoute element={Quizes} />} />
            <Route path="books" element={<ProtectedRoute element={Books} />} />
            <Route path="settings" element={<ProtectedRoute element={Setting} />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/*ADMIN ROUTES  */}
          <Route path="/admin/dashboard/controle" element={<Admin />}>
            <Route index element={<AddTeacher />} />
            <Route path="add-teacher" element={<AddTeacher />} />
            <Route path="delete-teacher" element={<DeleteTeacher />} />
            <Route path="students" element={<Students />} />
            <Route path="settings" element={<Setting />} />
            <Route path="blocked" element={<BlockedUsers />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* TEACHER ROUTES */}
          <Route path="/teacher/dashboard/controle" element={<TeacherDashboard />} >
            <Route index element={<TeacherDashboardComponent />} />
            <Route path="dashboard" element={<TeacherDashboardComponent />} />
            <Route path="courses" element={<Courses />} />
            <Route path="students" element={<TeacherStudent />} />
            <Route path="notes" element={<TeacherNotes />} />
            <Route path="quizes" element={<AllQuizes />} />
            <Route path="teacher-add-quize" element={<TeacherQuizes />} />
            <Route path="settings" element={<Setting />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          <Route path="/teacher/courses/teacher-courses" element={<UpdateCourse />} />

          {/* VIDEO PLAYER ROUTE */}
          <Route path="/user/user-subjects/videos" element={<AllVideos />} />
          <Route path="/user/user-subjects/video-play" element={<VideoPlayer />} />

          <Route path="/user/user-subjects/quizzes" element={<QuizzesView />} />
          <Route path="/user/user-subjects/quizzes/questions" element={<QuizzesViewQuestions />} />
          <Route path="/teacher/dashboard/controle/quizes/specific-garde-quizes" element={<LevelQuizzes />} />

          <Route path="/user/user-subjects/notes" element={<NotesView />} />
          <Route path="/teacher/dashboard/controle/notes/update-notes" element={<UpdateNotes />} />
          <Route path="/not-allowed" element={<NotAllowed />} />
        </Routes>
    </div>
  );
};

export default App;

// 211848@Mentis.com  OCtzMDhh
