import { IsEmail, IsString } from 'class-validator';


export class organizationLoginDto{

    @IsEmail()
    orgEmail: string

    @IsString()
    orgPassword: string
}