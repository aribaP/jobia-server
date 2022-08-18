import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { userInfo } from 'os';
import { CandidateService } from 'src/candidate/candidate.service';
import { AuthService } from './auth.service';
import { candidateCreateDto } from './dto/candidate-create.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

   constructor(private authService: AuthService) {  }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: any){
        return this.authService.login(req.user);

    }

   

}
