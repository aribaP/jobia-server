import { IsString, IsInt} from 'class-validator';

export class resumeExperienceCreateDto{
    expId: number
    
    @IsInt()
    expYear: number
    
    @IsString()
    expCompanyName: String
    
    @IsString()
    expDescription: String
    
    // resFK: number   // FK
}