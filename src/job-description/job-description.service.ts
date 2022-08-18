import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { candidate } from 'src/candidate/entity/candidate.entity';
import { resume } from 'src/resume/entity/resume.entity';
import { score } from 'src/score/entity/score.entity';
import { Connection, Repository } from 'typeorm';
import { jobDescriptionCreateDto } from './dto/jobDescription-create.dto';
import { jobDescriptionUpdateDto } from './dto/jobDescription-update.dto';
import { scoreCreateDto } from '../score/dto/score-create.dto';
import { jobDescription } from './entity/job-description.entity';
var natural = require("natural");
var sw = require('remove-stopwords');

@Injectable()
export class JobDescriptionService {
    constructor(
        @InjectRepository(jobDescription)
        private jobDescriptionRepository: Repository<jobDescription>,
        @InjectRepository(resume)
        private resumeRepository: Repository<resume>,
        @InjectRepository(candidate)
        private candidateRepository: Repository<candidate>,
        @InjectRepository(score)
        private scoreRepository: Repository<score>,

    ) { }

    wordCountMap(str) {
        // console.log(typeof str); // 👉️ object

        const words = str.toString().split(' ');
        // console.log(words); // 👉️ ['Fri', 'Dec', ...]


        let wordCount = {};
        words.forEach((w) => {
            wordCount[w] = (wordCount[w] || 0) + 1;

        });
        return wordCount;
    }

    addWordsToDictionary(wordCountmap, dict) {
        for (let key in wordCountmap) {
            dict[key] = true;
        }
    }
    wordMapToVector(map, dict) {
        let wordCountVector = [];
        for (let term in dict) {
            wordCountVector.push(map[term] || 0);
        }
        return wordCountVector;
    }

    dotProduct(vecA, vecB) {
        let product = 0;
        for (let i = 0; i < vecA.length; i++) {
            product += vecA[i] * vecB[i];
        }
        return product;
    }

    magnitude(vec) {
        let sum = 0;
        for (let i = 0; i < vec.length; i++) {
            sum += vec[i] * vec[i];
        }
        return Math.sqrt(sum);
    }

    cosineSimilarity(vecA, vecB) {
        return this.dotProduct(vecA, vecB) / (this.magnitude(vecA) * this.magnitude(vecB));
    }

    textCosineSimilarity(txtA, txtB) {
        const wordCountA = this.wordCountMap(txtA);
        const wordCountB = this.wordCountMap(txtB);
        let dict = {};
        this.addWordsToDictionary(wordCountA, dict);
        this.addWordsToDictionary(wordCountB, dict);
        const vectorA = this.wordMapToVector(wordCountA, dict);
        const vectorB = this.wordMapToVector(wordCountB, dict);
        return this.cosineSimilarity(vectorA, vectorB);

    }

    async createJD(jdCreateDto: jobDescriptionCreateDto): Promise<resume[]> {
        // console.log(jdCreateDto);
        const saved = await this.jobDescriptionRepository.save(jdCreateDto);

        const getAllResumes = await this.resumeRepository.find({
            relations: ['eduFK', 'expFK', 'projFK']
        });

        let expYears, countYears = 0, edubach, eduMast;

        for (let index = 0; index < getAllResumes.length; index++) {
            const element = getAllResumes[index];
            for (let i = 0; i < element['eduFK'].length; i++) {

                const bachlower = element['eduFK'][i]['eduDegree'].toLowerCase();
                if (bachlower.includes("bach") || bachlower.includes("bachelors") ||bachlower.includes("bachelor") || bachlower.includes("bs"))
                    edubach = element['eduFK'][i]['eduDegree'];

                const masterslower = element['eduFK'][i]['eduDegree'].toLowerCase();
                if (masterslower.includes("master" ) || masterslower.includes("ms") || masterslower.includes( "masters" ))
                    eduMast = element['eduFK'][i]['eduDegree'];
            }

            for (let i = 0; i < element['expFK'].length; i++) {
                expYears = element['expFK'][i]['expYear'];
                countYears = expYears + countYears;
            }

            let acc2, acc3;
            const acc1 = this.textCosineSimilarity(element.position, jdCreateDto.jdPosition);
            if (!eduMast)
                acc2 = this.textCosineSimilarity(element.careerObjective + element.skills + edubach, jdCreateDto.jdRequiredSkills);
            else if (eduMast)
                acc2 = this.textCosineSimilarity(element.careerObjective + element.skills + edubach + eduMast, jdCreateDto.jdRequiredSkills);
            else
                acc2 = this.textCosineSimilarity(element.careerObjective + element.skills + element['eduFK'], jdCreateDto.jdRequiredSkills);

            if (expYears && countYears >= jdCreateDto.jdMinimumExperience)
                acc3 = 0.9;
            else if (expYears > 0)
                acc3 = 0.2;

            var accuracy = ((acc1 * 0.3) + (acc2 * 0.3) + (acc3 * 0.4)) * 100;
            console.log(accuracy);
            const scoreDto: scoreCreateDto = {
                score: accuracy,
                jdId: jdCreateDto.jdId,
                resId: element.resId
            };
            if (accuracy >= 50) {
                const whatever = this.scoreRepository.save(scoreDto);
            }
        }
        return await this.resumeRepository.find();

    }


    async updateJD(jdUpdateDto: jobDescriptionUpdateDto, jdId: number) {
        return await this.jobDescriptionRepository.update(jdId, jdUpdateDto);
    }


    async showJDById(jdId: number): Promise<jobDescription> {
        return await this.jobDescriptionRepository.findOne({ where: { jdId } });
    }

    async deleteJD(jdId: number) {
        return await this.jobDescriptionRepository.delete(jdId);
    }

    // async getJD(): Promise<jobDescription[]> {
    //     return await this.jobDescriptionRepository.find();
    // }
}
