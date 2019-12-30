export interface IUser {
    id: number;
    fakeToken: string;
    name: {
        firstName: string;
        lastName: string;
    };
    login: string;
    password: string;
}
