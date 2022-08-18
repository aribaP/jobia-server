import { IsString, IsInt} from 'class-validator';

export class resumeEducationUpdateDto{
    @IsInt()
    eduEndYear: number
    
    @IsString()
    eduInstituteName: String
    
    @IsString()
    eduDegree: String
}