import { IsEmail, IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { Unique } from 'typeorm';

export class candidateCreateDto {
    candId: number;

    @IsNotEmpty({ message: 'Full name is mandatory.'})
    @IsString()
    candName: string;

    @IsNotEmpty({ message: 'Email is mandatory.'})
    @Validate(Unique)
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