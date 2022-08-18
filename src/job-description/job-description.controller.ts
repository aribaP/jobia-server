import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { jobDescriptionCreateDto } from './dto/jobDescription-create.dto';
import { jobDescriptionUpdateDto } from './dto/jobDescription-update.dto';
import { scoreCreateDto } from '../score/dto/score-create.dto';
import { JobDescriptionService } from './job-description.service';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';


@Roles(Role.Organization)
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('job-description')
export class JobDescriptionController {
    constructor(private jdService: JobDescriptionService) { }


    @Post('/addjobdescription')
    storeJobDescription(@Body(ValidationPipe) jdCreateDto: jobDescriptionCreateDto) {
        console.log("Here");
        return this.jdService.createJD(jdCreateDto);
    }

    @Get('getone/:jdId')
    getJobDescription(@Param('jdId', ParseIntPipe) jdId: number) {
        return this.jdService.showJDById(jdId);
    }

    @Patch('update/:jdId')
    updateJobDescription(
        @Body(ValidationPipe) jdUpdateDto: jobDescriptionUpdateDto,
        @Param('jdId', ParseIntPipe) jdId: number) {

        return this.jdService.updateJD(jdUpdateDto, jdId);
    }

    @Delete('delete/:jdId')
    deletejobDescription(@Param('jdId', ParseIntPipe) jdId: number) {
        return this.jdService.deleteJD(jdId);
    }

    // @Get()
    // getAllJobDescriptions() {
    //     return this.jdService.getJD();
    // }
}
