import { IsEmail, IsString } from 'class-validator';


export class candidateLoginDto{

    @IsEmail()
    candEmail: string

    @IsString()
    candPassword: string
}