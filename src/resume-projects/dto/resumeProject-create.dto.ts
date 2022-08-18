import { IsString } from 'class-validator';

export class resumeProjectCreateDto{
    projId: number
    
    @IsString()
    projTitle: String
    
    @IsString()
    projDescription: String
    // resFK: number   // FK
}