import { IsEmail, IsString } from 'class-validator';


export class loginDto{
    @IsEmail()
    candEmail: string;

    @IsString()
    candPassword: string;
}