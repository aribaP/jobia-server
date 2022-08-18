// Now we can implement our Passport local authentication strategy. ?

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'
import { ignoreElements } from 'rxjs';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string): Promise<any> {
        const cand = await this.authService.validateCandidate(email, password);
        if (!cand) {
            const org = await this.authService.validateOrganization(email, password);
            if(!org)
                throw new UnauthorizedException();
            else
                return org;   
        }
        else
            return cand;
    }
}