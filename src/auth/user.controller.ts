import { Controller, Post, Body, Get, UseGuards, Request, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateRoleDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './roles.guard';
import { RoleEnum } from './enums/role.enum';


@Controller('users')
export class UserController {
	constructor(private usersService: UserService) {}
	
	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		return this.usersService.register(createUserDto);
	}
	
	@Post('login')
	async login(@Body() loginUserDto: LoginUserDto) {
		return this.usersService.login(await this.usersService.validateUser(loginUserDto.username, loginUserDto.password));
	}
	
	@Get('me')
	@UseGuards(JwtAuthGuard)
	getProfile(@Request() req) {
		return req.user;
	}
	
	@Put(':id/role')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(RoleEnum.Admin)
	updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return this.usersService.updateUserRole(id, updateRoleDto);
	}
}