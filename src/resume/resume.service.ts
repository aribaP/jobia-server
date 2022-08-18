import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { scoreCreateDto } from 'src/score/dto/score-create.dto';
import { jobDescription } from 'src/job-description/entity/job-description.entity';
import { score } from 'src/score/entity/score.entity';
import { Repository } from 'typeorm';
import { resumeCreateDto } from './dto/resume-create.dto';
import { resumeUpdateDto } from './dto/resume-update.dto';
import { resume } from './entity/resume.entity';
import { candidate } from 'src/candidate/entity/candidate.entity';

@Injectable()
export class ResumeService {
    constructor(
        @InjectRepository(resume)
        private resumeRepository: Repository<resume>,
        @InjectRepository(jobDescription)
        private jobDescriptionRepository: Repository<jobDescription>,
        @InjectRepository(score)
        private scoreRepository: Repository<score>,
        @InjectRepository(candidate)
        private candidateRepository: Repository<candidate>,

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

    async createWholeResume(resCreateDto: resumeCreateDto) {
        console.log(resCreateDto);
        console.log("2");
        const saved = await this.resumeRepository.save(resCreateDto);



        console.log("1");
        const getAllJD = await this.jobDescriptionRepository.find({});
        console.log("3");
        let expYears, countYears = 0, edubach, eduMast, bachlower, masterslower;
        // 
        for (let i = 0; i < resCreateDto[0]['eduFK'].length; i++) {
            if (resCreateDto[0]['eduFK'][i].eduDegree != "") {
                bachlower = resCreateDto[0]['eduFK'][i].eduDegree.toLowerCase();
                if (bachlower.includes("bach") || bachlower.includes("bachelors") || bachlower.includes("bachelor") || bachlower.includes("bs"))
                    edubach = resCreateDto[0]['eduFK'][i].eduDegree;
            }
            if (resCreateDto[0]['eduFK'][i].eduDegree != "") {
                masterslower = resCreateDto[0]['eduFK'][i].eduDegree.toLowerCase();
                if (masterslower.includes("master") || masterslower.includes("ms") || masterslower.includes("masters"))
                    eduMast = resCreateDto[0]['eduFK'][i].eduDegree;
            }
        }

        for (let i = 0; i < resCreateDto[0]['expFK'].length; i++) {
            expYears = resCreateDto[0]['expFK'][i].expYear;
            countYears = expYears + countYears;
        }


        for (let index = 0; index < getAllJD.length; index++) {


            let acc2, acc3;
            const acc1 = this.textCosineSimilarity(getAllJD[index].jdPosition, resCreateDto[0].position);
            if (!eduMast)
                acc2 = this.textCosineSimilarity(getAllJD[index].jdRequiredSkills, resCreateDto[0].skills + edubach + resCreateDto[0].careerObjective);
            else if (eduMast)
                acc2 = this.textCosineSimilarity(getAllJD[index].jdRequiredSkills, resCreateDto[0].skills + edubach + eduMast + resCreateDto[0].careerObjective);
            else
                acc2 = this.textCosineSimilarity(getAllJD[index].jdRequiredSkills, resCreateDto[0].skills + resCreateDto[0]['eduFK'] + resCreateDto[0].careerObjective);

            if (expYears && countYears >= getAllJD[index].jdMinimumExperience)
                acc3 = 0.9;
            else if (expYears > 0)
                acc3 = 0.1;


            const accuracy = ((acc1 * 0.3) + (acc2 * 0.3) + (acc3 * 0.4)) * 100;

            console.log(getAllJD[index].jdId, ": ", accuracy);
            console.log("saved", saved[0].resId);
            const scoreDto: scoreCreateDto = {
                score: accuracy,
                jdId: getAllJD[index].jdId,
                resId: saved[0].resId
            };
            if (accuracy >= 50) {
                const whatever = this.scoreRepository.save(scoreDto);
            }
        }
        return await this.scoreRepository.find();

    }
    async showResume(resId: number) {
        return await this.resumeRepository.findOne({
            relations: ['eduFK', 'expFK', 'projFK'],
            where: { resId }
        });


    }

    async showWholeResume(resId: number) {
        const getCand = await this.resumeRepository.findOne({
            relations: ['candFK'],
            where: { resId }
        });



        const getResume = await this.resumeRepository.find({
            relations: ['projFK', 'eduFK', 'expFK'],
            where: { resId: resId }
        });

        console.log(getResume[0]);

        return {
            getResume: getResume[0],
            getCand: {
                candAddress: getCand.candFK.candAddress,
                candCity: getCand.candFK.candCity,
                candContactNumber: getCand.candFK.candContactNumber,
                candEmail: getCand.candFK.candEmail,
                candName: getCand.candFK.candName
            },

        };
    }

    updateWholeResume(resUpdateDto: resumeUpdateDto, resId: number) {
       
        console.log(resUpdateDto);
        return this.resumeRepository.update(resId, resUpdateDto);


    }

    deleteWholeResume(resId: number) {
        return this.resumeRepository.delete(resId);
    }






    // async showResumeExperienceByResumeId(resFK: number): Promise<resume[]> {
    //     return await this.resumeRepository.find({
    //         relations: ['expFK'], 
    //         where: {resId: resFK}
    //     });
    // }  

    // async showResumeEducationByResumeId(resFK: number): Promise<resume[]> {
    //     return await this.resumeRepository.find({
    //         relations: ['eduFK'], 
    //         where: {resId: resFK}
    //     });
    // }  

    // async showResumeProjectByResumeId(resFK: number): Promise<resume[]> {
    //     return await this.resumeRepository.find({
    //         relations: ['projFK'], 
    //         where: {resId: resFK}
    //     });
    // }  

    // getR(): Promise<resume[]> {
    //     return this.resumeRepository.find();
    // }

    // createR(resCreateDto: resumeCreateDto) {
    //     return this.resumeRepository.save(resCreateDto);
    // }

    // showRById(resId: number) {
    //     return this.resumeRepository.findOne({where :{resId}});
    // }


}


// [
//     {
//         "resId": 6,
//         "careerObjective": "My career Objective 2",
//         "position": "My Position 2",
//         "skills": "My skills 2",
//         "linkedIn": "My linkedin link 2",
//         "gitHub": "My github Link 2",
//         "hobbiesInterest": "My hibbies and interest 2",
//         "candFK": 12
//         "projFK": [
//             {
//                 "projId": 29,
//                 "projTitle": "My Project title",
//                 "projDescription": "My project description"
//             }
//         ],
//         "eduFK": [
//             {
//                 "eduId": 19,
//                 "eduEndYear": 2001,
//                 "eduInstituteName": "My education institute",
//                 "eduDegree": "Bachelors"
//             }
//         ],
//         "expFK": [
//             {
//                 "expId": 1,
//                 "expYear": 2003,
//                 "expCompanyName": "Company Name",
//                 "expDescription": "My desription"
//             },
//             {
//                 "expId": 2,
//                 "expYear": 2004,
//                 "expCompanyName": "Company Name2",
//                 "expDescription": "My desription2"
//             }
//         ]
//     }
// ]