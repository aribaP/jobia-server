import { IsString } from 'class-validator';

export class resumeProjectUpdateDto{
    @IsString()
    projTitle: String
    
    @IsString()
    projDescription: String
}