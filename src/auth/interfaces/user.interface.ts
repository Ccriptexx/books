import { Types } from 'mongoose';
import { IRole } from "./role.interface";

export interface IUser {
	username: string;
	password: string;
	roles: number;
}