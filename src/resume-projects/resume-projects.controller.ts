import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { resumeProjectCreateDto } from './dto/resumeProject-create.dto';
import { resumeProjectUpdateDto } from './dto/resumeProject-update.dto';
import { ResumeProjectsService } from './resume-projects.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Roles(Role.Candidate)
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('resume-projects')
export class ResumeProjectsController {
    constructor(private ResProjService: ResumeProjectsService) {}

    @Get()
    getresumeProjects() {
      return this.ResProjService.getResProj();
      // return "I am from resumeProject controller"
    }

    @Post()
    store(@Body() ResProjCreateDto: resumeProjectCreateDto){

        return this.ResProjService.createResProj(ResProjCreateDto);
    }

    @Patch('/:projId')
    update(
      @Body() ResProjUpdateDto: resumeProjectUpdateDto,
      @Param('projId', ParseIntPipe) projId: number) {
    
      return this.ResProjService.updateResProj(ResProjUpdateDto, projId);
    }
    
    @Get('/:projId')
    getresumeProjectById(@Param('projId') projId: number) {
      return this.ResProjService.showResProjById(projId);
    }

    @Delete('/:projId')
    deleteresumeProject(@Param('projId', ParseIntPipe) projId: number) {
      return this.ResProjService.deleteResProj(projId);
    }
}


// {
//   "projTitle": "My Project title",
//   "projDescription": "My project description",
//   "resFK": 2
// }