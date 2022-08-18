import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jobDescription } from 'src/job-description/entity/job-description.entity';
import { resume } from 'src/resume/entity/resume.entity';
import { score } from 'src/score/entity/score.entity';
import { organization } from './entity/organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
  imports: [TypeOrmModule.forFeature([organization, score, resume, jobDescription])],
})
export class OrganizationModule {}
