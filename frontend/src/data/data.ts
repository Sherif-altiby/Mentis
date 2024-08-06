import { FaRegCompass } from "react-icons/fa";
import { MdSlowMotionVideo } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";


export const menusData = [
  { title: "لوحة التحكم", icon: FaRegCompass, link: "dashboard" },
  { title: "المحاضرات", icon: MdSlowMotionVideo, link: "lectures" },
  { title: "الاختبارات", icon: MdQuiz, link: "quizes" },
  { title: "المذكرات", icon: MdLibraryBooks, link: "books" },
  { title: "الاعدادات", icon: IoSettings, link: "settings" },
  { title: "الإشعارات", link: "notifications", icon: IoNotifications },
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
  { title: "الإشعارات", link: "notifications", icon: IoNotifications },
  { title: "تسجيل الخروج", icon: RiLogoutCircleLine, link: "/" },

];



import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

export const adminData = [
  { id: 1, title: "إضافة مدرس", icon: IoAddCircle, link: 'add-teacher'},
  { id: 2, title: "حذف مدرس", icon: MdDelete, link: 'delete-teacher'},
  { id: 2, title: "إضافة كورس", icon: IoAddCircle, link: 'add-course'},
  { title: "الإعدادات", link: "settings", icon: CiSettings },
  { title: "الإشعارات", link: "notifications", icon: IoNotifications },
  { title: "تسجيل الخروج", icon: RiLogoutCircleLine, link: "/" },

]