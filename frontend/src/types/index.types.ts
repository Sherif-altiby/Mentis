export type card = { id: number; title: string; img: string; link: string };
export type dataType = card[];

export type RegisterProps = {
    userName: string;
    parentName: string;
    userPhone: string;
    parentPhone: string;
    role: string;
}


export type TeacherProps = {
    email: string;
    id: number;
    phone_number: string;
    role: string;
    name: string
}

export type userInfo = {
    name: string;
    email: string;
    phone_number: string;
    role: string;
    user_id: number
  }