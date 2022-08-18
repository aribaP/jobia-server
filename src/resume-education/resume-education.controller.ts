import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { resumeEducationCreateDto } from './dto/resumeEducation-create.dto';
import { resumeEducationUpdateDto } from './dto/resumeEducation-update.dto';
import { ResumeEducationService } from './resume-education.service';


@Roles(Role.Candidate)
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('resume-education')
export class ResumeEducationController {
    constructor(private ResEduService: ResumeEducationService) {}

    @Get()
    getresumeEducations() {
        return this.ResEduService.getResEdu();
        // return "I am from resumeEducation controller"
    }

    @Post()
    store(@Body() ResEduCreateDto: resumeEducationCreateDto){
        return this.ResEduService.createResEdu(ResEduCreateDto);
    }

    @Patch('/:eduId')
    update(
      @Body() ResEduUpdateDto: resumeEducationUpdateDto,
      @Param('eduId', ParseIntPipe) eduId: number) {    
          return this.ResEduService.updateResEdu(ResEduUpdateDto, eduId);
    }
    
    @Get('/:eduId')
    getresumeEducationById(@Param('eduId') eduId: number) {
        return this.ResEduService.showResEduById(eduId);
    }

    @Delete('/:eduId')
    deleteresumeEducation(@Param('eduId', ParseIntPipe) eduId: number) {
        return this.ResEduService.deleteResEdu(eduId);
    }
}


// {
//     "eduEndYear": 2001,
//     "eduInstituteName": "My education institute",
//     "eduDegree": "Bachelors",
//     "resFK": 2
// }