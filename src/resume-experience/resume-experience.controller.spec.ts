import { Test, TestingModule } from '@nestjs/testing';
import { ResumeExperienceController } from './resume-experience.controller';

describe('ResumeExperienceController', () => {
  let controller: ResumeExperienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeExperienceController],
    }).compile();

    controller = module.get<ResumeExperienceController>(ResumeExperienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
