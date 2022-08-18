import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class jobDescriptionCreateDto{
    jdId: number

    @IsString()
    @IsNotEmpty()
    jdPosition: string
    
    @IsNotEmpty()
    jdMinimumExperience: number
    
    @IsNotEmpty()
    @IsString()
    jdRequiredSkills: string
    
    @IsNotEmpty()
    // @IsString()
    jdLocation: string
    
    @IsNotEmpty()
    @IsString()
    jdCity: string

    // orgFK: number      // FK
    // @IsNotEmpty()
    // @IsInt()
    // orgFKOrgId: number
    
}