export type card = { id: number; title: string; img: string; link: string };
export type dataType = card[];

export type RegisterProps = {
    userName: string;
    parentName: string;
    userPhone: string;
    parentPhone: string;
    role: string;
    grade_level: number | string;
}


export type TeacherProps = {
    email: string;
    id: number;
    phone_number: string;
    role: string;
    name: string;
    courses: {
        id: string;
        price: string;
        title: string;
    }[];
}

export type userInfo = {
    name: string;
    email: string;
    phone_number: string;
    role: string;
    user_id: number;
  }

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
     }
}

export type QuestionProps = {
    name: string;
    answers: [
        one:   {value: string, correct: "true" | "false"},
        two:   {value: string, correct: "true" | "false"},
        three: {value: string, correct: "true" | "false"},
        foure: {value: string, correct: "true" | "false"},
    ]
}

export type allQuestionsProps = QuestionProps[]

export type courseProps = {
    course_id: string | number;
    id: string | number;
    file_path: string;
    title: string;
    level: string;
}