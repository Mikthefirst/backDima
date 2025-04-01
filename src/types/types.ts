import { Role } from '../user/enums/role.enum';

export interface IUser{
    id: string,
    email: string,
    role: Role,
    fullname: string,
}