import { IsString, IsInt} from 'class-validator';

export class resumeEducationCreateDto{
    eduId: number

    @IsInt()
    eduEndYear: number
    
    @IsString()
    eduInstituteName: String
    
    @IsString()
    eduDegree: String
    // resFK: number   // FK
}