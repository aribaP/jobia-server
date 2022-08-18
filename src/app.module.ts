import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import { organization } from './organization/entity/organization.entity';
import { OrganizationModule } from './organization/organization.module';

import { jobDescription } from './job-description/entity/job-description.entity';
import { JobDescriptionModule } from './job-description/job-description.module';

import { candidate } from './candidate/entity/candidate.entity';
import { CandidateModule } from './candidate/candidate.module';

import { resume } from './resume/entity/resume.entity';
import { ResumeModule } from './resume/resume.module';

import { resumeEducation } from './resume-education/entity/resume-education.entity';
import { ResumeEducationModule } from './resume-education/resume-education.module';

import { resumeExperience } from './resume-experience/entity/resume-experience.entity';
import { ResumeExperienceModule } from './resume-experience/resume-experience.module';

import { resumeProjects } from './resume-projects/entity/resume-projects.entity';
import { ResumeProjectsModule } from './resume-projects/resume-projects.module';

import { score } from './score/entity/score.entity';
import { ScoreModule } from './score/score.module';

import { AuthModule } from './auth/auth.module';

// mysql://baa5cf0bf0ef81:cea05d22@us-cdbr-east-06.cleardb.net/heroku_462ce6ee6f8f9ad?reconnect=true
@Module({
  controllers: [AppController],
  imports: [
    CandidateModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'us-cdbr-east-06.cleardb.net',
      port: 3306,
      username: 'baa5cf0bf0ef81',
      password: 'cea05d22',
      database: 'heroku_462ce6ee6f8f9ad',
      entities: [candidate, resume, organization, jobDescription, resumeEducation, resumeExperience, resumeProjects, score],
      synchronize: true,
      autoLoadEntities: true, 
    }),
    ResumeModule,
    ResumeExperienceModule,
    ResumeEducationModule,
    ResumeProjectsModule,
    OrganizationModule,
    JobDescriptionModule,
    ScoreModule,
    AuthModule,
  ],
  providers: [candidate],
})
export class AppModule {}
