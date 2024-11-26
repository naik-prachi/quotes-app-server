import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUsersDto{

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}