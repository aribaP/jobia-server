import { Test, TestingModule } from '@nestjs/testing';
import { ResumeProjectsService } from './resume-projects.service';

describe('ResumeProjectsService', () => {
  let service: ResumeProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeProjectsService],
    }).compile();

    service = module.get<ResumeProjectsService>(ResumeProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
