import { FaRegCompass } from "react-icons/fa";
import { MdSlowMotionVideo } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

export const menusData = [
  { title: "لوحة التحكم", icon: FaRegCompass, link: "dashboard" },
  { title: "المحاضرات", icon: MdSlowMotionVideo, link: "lectures" },
  { title: "الاختبارات", icon: MdQuiz, link: "quizes" },
  { title: "المذكرات", icon: MdLibraryBooks, link: "books" },
  { title: "الاعدادات", icon: IoSettings, link: "setting" },
  { title: "تسجيل الخروج", icon: RiLogoutCircleLine, link: "/" },
];



import { CiSettings } from "react-icons/ci";
import { GrNotes } from "react-icons/gr";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineQuiz } from "react-icons/md";

export const TeacherDashboardData = [
  { title: "لوحة التحكم", link: "dashboard", icon: FaRegCompass },
  { title: "الدروس", link: "courses", icon: MdOutlineSlowMotionVideo },
  { title: "الطلاب", link: "students", icon: FaPeopleGroup },
  { title: "المذكرات", link: "notes", icon: GrNotes },
  { title: "الإختبارات", link: "quizes", icon: MdOutlineQuiz },
  { title: "الإعدادات", link: "settings", icon: CiSettings },
];
