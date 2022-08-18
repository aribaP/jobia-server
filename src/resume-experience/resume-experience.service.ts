import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resumeExperienceCreateDto } from './dto/resumeExperience-create.dto';
import { resumeExperienceUpdateDto } from './dto/resumeExperience-update.dto';
import { resumeExperience } from './entity/resume-experience.entity';

@Injectable()
export class ResumeExperienceService {
    constructor(
        @InjectRepository(resumeExperience)
        private resumeExperienceRepository: Repository<resumeExperience>,

    ) { }

    getResExp(): Promise<resumeExperience[]> {
        return this.resumeExperienceRepository.find();
    }

    createResExp(expCreateDto: resumeExperienceCreateDto) {
        return this.resumeExperienceRepository.save(expCreateDto);
    }

    updateResExp(expUpdateDto: resumeExperienceUpdateDto, expId: number ){
        return this.resumeExperienceRepository.update(expId, expUpdateDto);
    }

    showResExpById(expId: number) {
        return this.resumeExperienceRepository.findOne({where :{expId}});
    }

    deleteResExp( expId: number ) {
        return this.resumeExperienceRepository.delete(expId);
    }
}
