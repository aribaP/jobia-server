import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { resumeCreateDto } from './dto/resume-create.dto';
import { resumeUpdateDto } from './dto/resume-update.dto';
import { ResumeService } from './resume.service';


@Roles(Role.Candidate)
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('resume')
export class ResumeController {
    constructor(private resService: ResumeService) { }

    @Post('/addwhole')
    storeAll(@Body() resCreateDto: resumeCreateDto) {
      console.log(resCreateDto);
      return this.resService.createWholeResume(resCreateDto);
    }
 
    @Get('/getwhole/:resId')
    getWholeResume(@Param('resId', ParseIntPipe) resId: number) {
      return this.resService.showWholeResume(resId);
    }

    @Get('/getresume/:resId')
    getResume(@Param('resId', ParseIntPipe) resId: number) {
      return this.resService.showResume(resId);
    }

    // @Patch('updatewhole/:resId')
    // update(
    //   @Body() resUpdateDto: resumeUpdateDto,
    //   @Param('resId', ParseIntPipe) resId: number) {

    //   console.log(resUpdateDto);
    //   return this.resService.updateWholeResume(resUpdateDto, resId);
    // }

    @Delete('deletewhole/:resId')
    deleteresume(@Param('resId', ParseIntPipe) resId: number) {
      return this.resService.deleteWholeResume(resId);
    }



    // @Get()
    // getresumes() {
    //   return this.resService.getR();
    //   // return "I am from resume controller"
    // }

    // @Post()
    // store(@Body() resCreateDto: resumeCreateDto) {

    //   return this.resService.createR(resCreateDto);
    // }

    // @Get('/resumeexperience/:resId')
    // getExperienceByResume(@Param('resId', ParseIntPipe) resId: number) {
    //   return this.resService.showResumeExperienceByResumeId(resId);
    // }

    // @Get('/resumeeducation/:resId')
    // getEducationByResume(@Param('resId', ParseIntPipe) resId: number) {
    //   return this.resService.showResumeEducationByResumeId(resId);
    // }

    // @Get('/resumprojects/:resId')
    // getProjectByResume(@Param('resId', ParseIntPipe) resId: number) {
    //   return this.resService.showResumeProjectByResumeId(resId);
    // }




}


// {
//   "careerObjective": "My career Objective",
//   "position": "My Position",
//   "skills": "My skills",
//   "linkedIn": "My linkedin link",
//   "gitHub": "My github Link",
//   "hobbiesInterest": "My hibbies and interest",
//   "candFK": 2
// }