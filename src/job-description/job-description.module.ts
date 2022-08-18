import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { candidate } from 'src/candidate/entity/candidate.entity';
import { resume } from 'src/resume/entity/resume.entity';
import { score } from 'src/score/entity/score.entity';
import { jobDescription } from './entity/job-description.entity';
import { JobDescriptionController } from './job-description.controller';
import { JobDescriptionService } from './job-description.service';

@Module({
  controllers: [JobDescriptionController],
  providers: [JobDescriptionService],
  imports: [TypeOrmModule.forFeature([jobDescription, resume, candidate, score])],
})
export class JobDescriptionModule {}
