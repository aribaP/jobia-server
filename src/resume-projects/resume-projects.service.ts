import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resumeProjectCreateDto } from './dto/resumeProject-create.dto';
import { resumeProjectUpdateDto } from './dto/resumeProject-update.dto';
import { resumeProjects } from './entity/resume-projects.entity';

@Injectable()
export class ResumeProjectsService {
    constructor(
        @InjectRepository(resumeProjects)
        private resumeProjectRepository: Repository<resumeProjects>,

    ) { }

    getResProj(): Promise<resumeProjects[]> {
        return this.resumeProjectRepository.find();
    }

    createResProj(projCreateDto: resumeProjectCreateDto) {
        return this.resumeProjectRepository.save(projCreateDto);
    }

    updateResProj(projUpdateDto: resumeProjectUpdateDto, projId: number ){
        return this.resumeProjectRepository.update(projId, projUpdateDto);
    }

    showResProjById(projId: number) {
        return this.resumeProjectRepository.findOne({where :{projId}});
    }

    deleteResProj( projId: number ) {
        return this.resumeProjectRepository.delete(projId);
    }
}
