import { IsString } from 'class-validator';

export class resumeCreateDto{
    resId: number

    @IsString()
    careerObjective: string
    
    @IsString()
    position: string
    
    @IsString()
    skills: string
    
    @IsString()
    linkedIn: string
    
    @IsString()
    gitHub: string

    //candId
    // education, experience, project
}