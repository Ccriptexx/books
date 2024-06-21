import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from "../interfaces/user.interface";

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
	@Prop({ required: true })
	username: string;
	
	@Prop({ required: true })
	password: string;
	
	@Prop({ required: true })
	email: string;
	
	@Prop({ default: 0 })
	roles: number;
}

export const UserSchema = SchemaFactory.createForClass(User);