export type card = { id: number; title: string; img: string; link: string };
export type dataType = card[];

export type RegisterProps = {
    userName: string;
    parentName: string;
    userPhone: string;
    parentPhone: string;
    role: string;
}