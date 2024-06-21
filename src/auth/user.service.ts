import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './shemas/user.schema';
import { CreateUserDto, UpdateRoleDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private jwtService: JwtService
	) {}
	
	async register(createUserDto: CreateUserDto): Promise<User> {
		const newUser = new this.userModel(createUserDto);
		return await newUser.save();
	}
	
	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userModel.findOne({ username }).lean();
		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
	
	async login(user: any) {
		const payload = { username: user.username, email: user.email, roles: user.roles };
		return {
			access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
		};
	}
	
	async getUserById(id: string) {
		return this.userModel.findById(id);
	}
	
	async updateUserRole(id: string, updateRoleDto: UpdateRoleDto): Promise<User> {
		return this.userModel.findByIdAndUpdate(id, { roles: updateRoleDto.role }, { new: true });
	}
}