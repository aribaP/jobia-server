import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jobDescription } from 'src/job-description/entity/job-description.entity';
import { Repository } from 'typeorm';
import { score } from './entity/score.entity';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(score)
        private scoreRepository: Repository<score>,
        @InjectRepository(jobDescription)
        private jdRepository: Repository<jobDescription>
    ) { }


    async deleteByResume(scoreId: number){
        console.log(scoreId);

        return await this.scoreRepository.delete(scoreId);
       

    }
}
