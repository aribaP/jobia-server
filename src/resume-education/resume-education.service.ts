import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resumeEducationCreateDto } from './dto/resumeEducation-create.dto';
import { resumeEducationUpdateDto } from './dto/resumeEducation-update.dto';
import { resumeEducation } from './entity/resume-education.entity';

@Injectable()
export class ResumeEducationService {
    constructor(
        @InjectRepository(resumeEducation)
        private resumeEducationRepository: Repository<resumeEducation>,

    ) { }

    getResEdu(): Promise<resumeEducation[]> {
        return this.resumeEducationRepository.find();
    }

    createResEdu(eduCreateDto: resumeEducationCreateDto) {
        return this.resumeEducationRepository.save(eduCreateDto);
    }

    updateResEdu(eduUpdateDto: resumeEducationUpdateDto, eduId: number ){
        return this.resumeEducationRepository.update(eduId, eduUpdateDto);
    }

    showResEduById(eduId: number) {
        return this.resumeEducationRepository.findOne({where :{eduId}});
    }

    deleteResEdu( eduId: number ) {
        return this.resumeEducationRepository.delete(eduId);
    }
}
