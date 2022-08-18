import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resume } from './entity/resume.entity';
import { resumeEducation } from 'src/resume-education/entity/resume-education.entity';
import { resumeExperience } from 'src/resume-experience/entity/resume-experience.entity';
import { resumeProjects } from 'src/resume-projects/entity/resume-projects.entity';
import { jobDescription } from 'src/job-description/entity/job-description.entity';
import { score } from 'src/score/entity/score.entity';
import { candidate } from 'src/candidate/entity/candidate.entity';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService],
  imports: [TypeOrmModule.forFeature([resume, resumeEducation, resumeExperience, resumeProjects, jobDescription, score, candidate])],
})
export class ResumeModule {}
