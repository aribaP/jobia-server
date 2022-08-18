import { Test, TestingModule } from '@nestjs/testing';
import { ResumeExperienceService } from './resume-experience.service';

describe('ResumeExperienceService', () => {
  let service: ResumeExperienceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeExperienceService],
    }).compile();

    service = module.get<ResumeExperienceService>(ResumeExperienceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
