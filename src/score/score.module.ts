import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jobDescription } from 'src/job-description/entity/job-description.entity';
import { resume } from 'src/resume/entity/resume.entity';
import { TypeORMError } from 'typeorm';
import { score } from './entity/score.entity';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService],
  imports: [TypeOrmModule.forFeature([score, resume, jobDescription])],
})
export class ScoreModule {}
