export type card = { id: number; title: string; img: string; link: string };
export type dataType = card[];

export type RegisterProps = {
    name: string;
    email: string;
    password: string;
    role: string;
    phone_number: string
}