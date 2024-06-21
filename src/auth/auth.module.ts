import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./shemas/user.schema";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule,
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
		]),
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
		}),
	],
	providers: [JwtStrategy, UserService],
	controllers: [UserController]
})
export class AuthModule {}