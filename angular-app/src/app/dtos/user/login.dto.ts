import { from } from "rxjs";
import {
    IsEmail,
    IsNotEmpty,
    IsString
} from 'class-validator';

export class LoginDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
    }
}