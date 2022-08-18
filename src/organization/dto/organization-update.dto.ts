import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


export class organizationUpdateDto {
    @IsString()
    orgName: string

    @IsEmail()
    orgEmail: string

    @IsString()
    orgContactNumber: string

    @IsString()
    @Length(8,30)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'},)
    orgPassword: string
}