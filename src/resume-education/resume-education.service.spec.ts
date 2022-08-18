import { Test, TestingModule } from '@nestjs/testing';
import { ResumeEducationService } from './resume-education.service';

describe('ResumeEducationService', () => {
  let service: ResumeEducationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeEducationService],
    }).compile();

    service = module.get<ResumeEducationService>(ResumeEducationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
