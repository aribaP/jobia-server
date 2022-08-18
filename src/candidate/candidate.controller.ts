import { Controller, Get, Req, Post, Patch, Param, Delete, Body, ParseIntPipe, UseGuards, ExecutionContext, ValidationPipe, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { CandidateService } from './candidate.service';
import { candidateCreateDto } from './dto/candidate-create.dto';
import { candidateLoginDto } from './dto/candidate-login.dts';
import { candidateUpdateDto } from './dto/candidate-update.dto';



@Controller('candidate')
export class CandidateController {

    constructor(private candService: CandidateService) { }

    @Post('/signupCand')
    async signUpCandidate(@Body(ValidationPipe) candCreateDto: candidateCreateDto) {
        console.log(candCreateDto);
        return await this.candService.signUpCand(candCreateDto);
    }



    @Roles(Role.Candidate)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/login')
    @UseFilters(HttpExceptionFilter)
    async loginCandidate(@Body() candLoginDto: candidateLoginDto) {
        console.log('hi');
        return await this.candService.loginCand(candLoginDto);

    }

    @Roles(Role.Candidate)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Patch('update/:candId')
    update(
        @Body() candUpdateDto: candidateUpdateDto,
        @Param('candId', ParseIntPipe) candId: number) {

        return this.candService.updateC(candUpdateDto, candId);
    }


    @Roles(Role.Candidate)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/showresume/:candId')
    showResumeUnderCandidate(@Param('candId', ParseIntPipe) candId: number) {
        return this.candService.showResumeByCandidateId(candId);
    }

    




    @Roles(Role.Candidate)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    getcandidates(context: ExecutionContext) {
      // const req = context.switchToHttp().getRequest();
      // console.log(req.user);
      return "I am here";
    }


    @Roles(Role.Candidate)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/notification/:candId')
    showNotificationUnderCandidate(@Param('candId', ParseIntPipe) candId: number) {
        return this.candService.getNotification(candId);
    }
    @Roles(Role.Candidate)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/:candId')
    getCandidateById(@Param('candId') candId: number) {
        return this.candService.showCById(candId);
    }
    @Roles(Role.Candidate)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('delete/:candId')
    deletecandidate(@Param('candId', ParseIntPipe) candId: number) {
        return this.candService.deleteC(candId);
    }
}
