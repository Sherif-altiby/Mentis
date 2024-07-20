import { FaRegCompass } from "react-icons/fa";
import { MdSlowMotionVideo } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

export const menusData = [
  {
    title: "لوحة التحكم",
    icon: FaRegCompass,
    link: "/dashboard",
  },
  {
    title: "المحاضرات",
    icon: MdSlowMotionVideo,
    link: "/videos",
  },
  {
    title: "الاختبارات",
    icon: MdQuiz,
    link: "/quizes",
  },
  {
    title: "المذكرات",
    icon: MdLibraryBooks,
    link: "/books",
  },
  { title: "الاعدادات", icon: IoSettings, link: "/settings" },
  { title: "تسجيل الخروج", icon: RiLogoutCircleLine, link: "/" },
  { title: "تسجيل الخروج", icon: RiLogoutCircleLine, link: "/" },
  { title: "تسجيل الخروج", icon: RiLogoutCircleLine, link: "/" },
  { title: "تسجيل الخروج", icon: RiLogoutCircleLine, link: "/" },
];
