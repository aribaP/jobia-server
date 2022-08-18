import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class candidateUpdateDto {
    @IsNotEmpty({ message: 'Full name is mandatory.'})
    @IsString()
    candName: string;

    @IsNotEmpty({ message: 'Email is mandatory.'})
    @IsEmail()
    candEmail: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is mandatory.'})
    @Length(8,30)
    candPassword: string;

    @Length(11)
    @IsString()
    candContactNumber: string;

    @IsString()
    candCity: string;

    @IsString()
    candAddress: string;

}