import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateUsersDto{
    
    @IsOptional()
    @IsString()
    first_name?: string;

    @IsOptional()
    @IsString()
    last_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsStrongPassword()
    password?: string;
}