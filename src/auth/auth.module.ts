import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CandidateModule } from 'src/candidate/candidate.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constant';
import { JwtStrategy } from './auth.jwt.strategy';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
    controllers: [AuthController],

    imports: [
        CandidateModule,
        OrganizationModule,
        PassportModule,

        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s'},

        })
    ],

    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
 // We'll start with the first requirement: authenticating a user. We'll then extend that by 
 // issuing a JWT. Finally, we'll create a protected route that checks for a valid JWT on the request.