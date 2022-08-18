import { Test, TestingModule } from '@nestjs/testing';
import { ResumeEducationController } from './resume-education.controller';

describe('ResumeEducationController', () => {
  let controller: ResumeEducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeEducationController],
    }).compile();

    controller = module.get<ResumeEducationController>(ResumeEducationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
