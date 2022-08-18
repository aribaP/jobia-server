import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { candidate } from './entity/candidate.entity';
import { candidateCreateDto } from './dto/candidate-create.dto';
import { candidateUpdateDto } from './dto/candidate-update.dto';
import { candidateLoginDto } from './dto/candidate-login.dts';
import { score } from 'src/score/entity/score.entity';
import { resume } from 'src/resume/entity/resume.entity';
import { jobDescription } from 'src/job-description/entity/job-description.entity';
import { organization } from 'src/organization/entity/organization.entity';

@Injectable()
export class CandidateService {

    constructor(
        @InjectRepository(candidate)
        private candidateRepository: Repository<candidate>,
        @InjectRepository(score)
        private scoreRepository: Repository<score>,
        @InjectRepository(jobDescription)
        private jobDescriptionRepository: Repository<jobDescription>,
        @InjectRepository(organization)
        private organizationRepository: Repository<organization>,
        @InjectRepository(resume)
        private resumeRepository: Repository<resume>,
    ) { }

    async signUpCand(candCreateDto: candidateCreateDto): Promise<candidate> {

        const exist = await this.candidateRepository.findOne({ where: { candEmail: candCreateDto.candEmail } });
        if (!exist) {
            return this.candidateRepository.save(candCreateDto);
        }
        else
        throw new HttpException('Account not found', HttpStatus.CONFLICT);
    }


    async loginCand(candLoginDto: candidateLoginDto): Promise<candidate> {

        console.log(candLoginDto);
        return await this.candidateRepository.findOne({ where: { candEmail: candLoginDto.candEmail, candPassword: candLoginDto.candPassword } })
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


    async updateC(candUpdateDto: candidateUpdateDto, candId: number) {
        return await this.candidateRepository.update(candId, candUpdateDto);
    }

    showCById(candId: number) {
        return this.candidateRepository.findOne({ where: { candId } });
    }

    deleteC(candId: number) {
        return this.candidateRepository.delete(candId);
    }

    async showResumeByCandidateId(candFK: number): Promise<candidate[]> {
        return await this.candidateRepository.find({
            relations: ['resFK'],
            where: { candId: candFK }
        });

    }
    getC() {

    }



    async getNotification(candFK: number) {
        const getResume = await this.candidateRepository.find({
            relations: ['resFK'],
            where: { candId: candFK }
        });

        console.log(getResume[0].resFK.resId);

        const scores = await this.scoreRepository.find({ where: { resId: getResume[0].resFK.resId } });



        console.log(scores.length);
        let JDs;
        console.log(scores);
        let JDObject = new Array();

        for (let index = 0; index < scores.length; index++) {

            JDs = await this.jobDescriptionRepository.find({
                relations: ['orgFK'],
                where: { jdId: scores[index]['jdId'] }
            });
            JDObject.push(JDs);

            
            JDObject[index] = {
                jdId: JDObject[index][0].jdId,
                jdPosition: JDObject[index][0].jdPosition,
                jdRequiredSkills: JDObject[index][0].jdRequiredSkills,
                jdMinimumExperience: JDObject[index][0].jdMinimumExperience,
                jdCity: JDObject[index][0].jdCity,
                jdLocation: JDObject[index][0].jdLocation,
                scoreId: scores[index].scoreId,
                orgName: JDObject[index][0].orgFK['orgName']

            };


        }
        console.log(JDObject);

        return JDObject;

    }







    // Extra for auth
    showCByEmail(cndEmail: string): Promise<candidate> {
        return this.candidateRepository.findOne({ where: { candEmail: cndEmail } });
        // return this.candidateRepository.createQueryBuilder().where('candEmail = :candEmail', { candEmail }).execute();

    }

}
