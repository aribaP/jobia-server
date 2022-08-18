import { Injectable } from '@nestjs/common';
import { CandidateService } from 'src/candidate/candidate.service';
import { JwtService } from '@nestjs/jwt';
import { OrganizationService } from 'src/organization/organization.service';

@Injectable()
export class AuthService {
    constructor(
        private candService: CandidateService,
        private orgService: OrganizationService,
        private jwtService: JwtService) { }

    async validateCandidate(candEmail: string, candPassword: string) {
        const details = await this.candService.showCByEmail(candEmail);
        // console.log(details);

        if (details && details.candPassword === candPassword) {
            return { details, Rolename: 'candidate' };
        }
        return null;
    }


    // error is here
    async login(details: any) {
        if (details.details.candEmail != null) {
            var payload = { email: details.details.candEmail, sub: details.details.candId, Rolename: details.Rolename };
            return [{
                access_token: this.jwtService.sign(payload), role: details.Rolename, candId: payload.sub
            }]
        }
        else {
            var payload = { email: details.details.orgEmail, sub: details.details.orgId, Rolename: details.Rolename };
            console.log("OrgId:", payload.sub);
            return [{
                access_token: this.jwtService.sign(payload), role: details.Rolename, orgId: payload.sub
            }]
        }
    }

    async validateOrganization(orgEmail: string, orgPassword: string) {
        const details = await this.orgService.showOByEmail(orgEmail);
        console.log(details);

        if (details && details.orgPassword === orgPassword) {
            return { details, Rolename: 'organization' };
        }
        return null;
    }

}

// in a real application, you wouldn't store a password in plain text. You'd instead use a library like bcrypt