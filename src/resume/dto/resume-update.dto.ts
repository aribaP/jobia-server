import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { Column, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// class resumeEducationDto {
//     eduId : number
//     eduEndYear: number
//     eduInstituteName: string
//     eduDegree: string
// }


// class resumeExperienceDto {
//     expId : number
//     expYear: number
//     expCompanyName: string
//     expDescription: string
// }

// class resumeProjectsDto {
//     projId : number
//     projTitle: string
//     projDescription: string
// }


export class resumeUpdateDto{
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

    // @Type(() => resumeEducationDto)
    // eduFK: resumeEducationDto[]

    // @Type(() => resumeExperienceDto)
    // expFK: resumeExperienceDto[]

    // @Type(() => resumeProjectsDto)
    // projFK: resumeProjectsDto[]
}

