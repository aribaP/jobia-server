import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class candidateCreateDto {
    candId: number;

    @IsNotEmpty({ message: 'Full name is mandatory.'})
    @IsString()
    candName: string;

    @IsNotEmpty({ message: 'Email is mandatory.'})
    @IsEmail()
    candEmail: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is mandatory.'})
    // @Length(8,30)
    candPassword: string;

    @IsString()
    candContactNumber: string;

    @IsString()
    candCity: string;

    @IsString()
    candAddress: string;

    @IsString()
    candCNIC: string;

}