export class User{
    id: number;
    name: string;
    username: string;
    password: string;
    session: string;

    public constructor(partial?: User) {
        Object.assign(this, partial);
    }
}