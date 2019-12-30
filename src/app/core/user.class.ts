import { IUser } from './user.model';

export class User implements IUser {
    id: number;
    fakeToken: string;
    name: {
        firstName: string;
        lastName: string;
    };
    login: string;
    password: string;
}
