import { IUser } from './user.model';

export class User implements IUser {
    id: number;
    token: string;
    name: {
        firstName: string;
        lastName: string;
    };
    login: string;
    password: string;
}
