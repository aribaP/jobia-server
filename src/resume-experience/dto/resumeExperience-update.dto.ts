import { IsString, IsInt} from 'class-validator';

export class resumeExperienceUpdateDto{
    @IsInt()
    expYear: number
    
    @IsString()
    expCompanyName: String
    
    @IsString()
    expDescription: String
}