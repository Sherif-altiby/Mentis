export type card = { id: number; title: string; img: string; link: string };
export type dataType = card[];

export type RegisterProps = {
  userName: string;
  parentName: string;
  userPhone: string;
  parentPhone: string;
  role: string;
  grade_level: number | string;
};

export type TeacherProps = {
  email: string;
  id: number;
  phone_number: string;
  role: string;
  name: string;
  image: string;
  courses: {
    id: string;
    price: string;
    title: string;
    description: string;
  }[];
};

export type userInfo = {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  user_id: number;
};

export type AllCoursesProps = {
  id: number;
  teacher_id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  teacher: {
    id: number;
    name: string;
    email: string;
  };
};

export type QuestionProps = {
  name: string;
  answers: [
    one: { value: string; correct: "true" | "false" },
    two: { value: string; correct: "true" | "false" },
    three: { value: string; correct: "true" | "false" },
    foure: { value: string; correct: "true" | "false" }
  ];
};

export type allQuestionsProps = QuestionProps[];

export type courseProps = {
  course_id: string | number;
  id: string | number;
  file_path: string;
  title: string;
  level: string;
};

export type quizeProps = {
  id: number;
  course_id: number;
  title: string;
  description: string;
  type: string;
  is_published: number;
  level: string;
  teacher_id: number;
};

export interface QuestionPropsInterface {
  correct_answer: string;
  id: number;
  question: string;
  options: string;
  quiz_id: number;
}

export interface QuestionAnswer {
  id: number;
  answer: string;
}

export interface ShuffledQuestion extends QuestionPropsInterface {
  shuffledOptions: Array<{ label: string; text: string }>;
}

export interface NoteInterface {
  course_id: number;
  file_id: number;
  id: number;
  level: string;
  title: string;
  image: string;
  file_path: string;
}

export interface NavProps {
  showIcon: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export type StudentsProps = {
  user_id: number;
  name: string;
  email: string;
  grade_level: string;
  image: string;
  phone_number: string;
};
