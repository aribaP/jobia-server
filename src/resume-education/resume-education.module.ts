import { Module } from '@nestjs/common';
import { ResumeEducationController } from './resume-education.controller';
import { ResumeEducationService } from './resume-education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resumeEducation } from './entity/resume-education.entity';
import { resume } from 'src/resume/entity/resume.entity';

@Module({
  controllers: [ResumeEducationController],
  providers: [ResumeEducationService],
  imports: [TypeOrmModule.forFeature([resumeEducation, resume])],
})
export class ResumeEducationModule {}
