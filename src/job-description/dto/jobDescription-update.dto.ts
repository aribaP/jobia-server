import { IsString, IsInt, IsNotEmpty} from 'class-validator';

export class jobDescriptionUpdateDto{
    @IsNotEmpty()
    @IsString()
    jdPosition: string
    
    @IsNotEmpty()
    @IsInt()
    jdMinimumExperience: number
    
    @IsNotEmpty()
    @IsString()
    jdRequiredSkills: string
    
    @IsNotEmpty()
    @IsString()
    jdLocation: string
    
    @IsNotEmpty()
    @IsString()
    jdCity: string
}