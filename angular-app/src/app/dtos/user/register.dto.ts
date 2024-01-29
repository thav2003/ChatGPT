import {
    IsString,
    IsNotEmpty,
    IsEmail
} from 'class-validator';

export class RegisterDTO {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    confirmPassword: string

    constructor(data: any) {
        this.fullName = data.fullName;
        this.email = data.email;
        this.password = data.password;
        this.confirmPassword = data.confirmPassword;
    }
}