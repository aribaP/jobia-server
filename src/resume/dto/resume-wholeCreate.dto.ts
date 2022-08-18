import { IsInt, IsString } from 'class-validator';

export class resumeCompleteCreateDto{
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

    
    // expId: number
    
    // @IsInt()
    // expYear: number
    
    // @IsString()
    // expCompanyName: string
    
    // @IsString()
    // expDescription: string

    // // eduId: number

    // // @IsInt()
    // // eduEndYear: number
    
    // // @IsString()
    // // eduInstituteName: string
    
    // // @IsString()
    // // eduDegree: string


    
    // projId: number
    
    // @IsString()
    // projTitle: string
    
    // @IsString()
    // projDescription: string

    //candId
    // education, experience, project
}