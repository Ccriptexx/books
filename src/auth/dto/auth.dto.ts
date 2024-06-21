export class CreateUserDto {
	username: string;
	password: string;
	email: string;
}

export class LoginUserDto {
	username: string;
	password: string;
}

export class UpdateRoleDto {
	role: number;
}