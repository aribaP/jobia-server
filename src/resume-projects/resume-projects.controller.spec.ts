import { Test, TestingModule } from '@nestjs/testing';
import { ResumeProjectsController } from './resume-projects.controller';

describe('ResumeProjectsController', () => {
  let controller: ResumeProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeProjectsController],
    }).compile();

    controller = module.get<ResumeProjectsController>(ResumeProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
