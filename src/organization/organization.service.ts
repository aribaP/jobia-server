import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { organizationCreateDto } from './dto/organization-create.dto';
import { organizationUpdateDto } from './dto/organization-update.dto';
import { organization } from './entity/organization.entity';
import validator from 'validator';
import { organizationLoginDto } from './dto/organization-login.dts';
import { from, Observable, switchMap } from 'rxjs';
import { score } from 'src/score/entity/score.entity';
import { resume } from 'src/resume/entity/resume.entity';

@Injectable()
export class OrganizationService {

    constructor(
        @InjectRepository(organization)
        private organizationRepository: Repository<organization>,
        @InjectConnection() private readonly connection: Connection,
        @InjectRepository(score)
        private scoreRepository: Repository<score>,

        @InjectRepository(resume)
        private resumeRepository: Repository<resume>,

    ) { }


    async signUpOrg(orgCreateDto: organizationCreateDto): Promise<organization> {

        const exist = await this.organizationRepository.findOne({ where: { orgEmail: orgCreateDto.orgEmail } });
        console.log("Exisr", exist);
        if (!exist) {
            console.log("hi");
            return this.organizationRepository.save(orgCreateDto);
        }
        else
        throw new HttpException('Account not found', HttpStatus.CONFLICT);

    }


    async loginOrg(orgLoginDto: organizationLoginDto): Promise<organization> {

        console.log(orgLoginDto);
        return await this.organizationRepository.findOne({ where: { orgEmail: orgLoginDto.orgEmail, orgPassword: orgLoginDto.orgPassword } })
            .then((result) => {
                if (result) {
                    return result;
                }
                else {
                    throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
                }
            })
            .catch(() => {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            });

    }


    async updateOrg(orgUpdateDto: organizationUpdateDto, orgId: number) {
        return await this.organizationRepository.update(orgId, orgUpdateDto);
    }


    async showOById(orgId: number)  {
        console.log(await this.organizationRepository.findOne({ where: { orgId } }));
        return await this.organizationRepository.findOne({ where: { orgId } });
    }


    updateLogo(orgUpdateDto: organizationUpdateDto, orgId: number) {
        return this.organizationRepository.update(orgId, orgUpdateDto);
    }

    deleteO(orgId: number) {
        return this.organizationRepository.delete(orgId);
    }

    async showAllJDOrg(orgFK: number) {
        const all =  await this.organizationRepository.find({
            relations: ['jdFK'],
            where: { orgId: orgFK }
        });

        console.log(all[0]['jdFK']);
        const returnJDs = all[0]['jdFK'];
        return returnJDs;


    }



    async getNotification(orgFK: number) {
        const getJD = await this.organizationRepository.find({
            relations: ['jdFK'],
            where: { orgId: orgFK }
        });

        console.log(getJD[0].jdFK.length);
        var scores = new Array();
        for (let index = 0; index < getJD[0].jdFK.length; index++) {

            if((await this.scoreRepository.find({ where: { jdId: getJD[0].jdFK[index].jdId } })).length != 0)
                scores.push(await this.scoreRepository.find({ where: { jdId: getJD[0].jdFK[index].jdId } }));

        }

        console.log(scores.length);
        let resumes = new Array();

        for (let index = 0; index < scores.length; index++) {
            for (let i = 0; i < scores[index].length; i++) {
                
                resumes.push(await this.resumeRepository.find({
                    relations: ['candFK', 'eduFK', 'expFK', 'projFK', 'scores'],
                    where: { resId: scores[index][i]['resId'] }
                }));
                
            }
        }

        console.log(resumes[1]);
        return resumes;

    }



    showOByEmail(orgEmail: string): Promise<organization> {
        return this.organizationRepository.findOne({ where: { orgEmail } });
    }
}


// {
//     "orgId": 1,
//     "orgName": "Folio3",
//     "orgEmail": "folio3@gmail.com",
//     "orgPassword": "Folio3",
//     "orgContactNumber": "3043048",
//     "orgLogo": "nfdieur"
// }

// {
//      "jdId": 7,
//      "jdPosition": "Folio3",
//      "jdMinimumExperience": 3,
//      "jdRequiredSkills": "Folio3efeifner",
//      "jdLocation": "FB",
//      "jdCity": "Karachi"
// }
