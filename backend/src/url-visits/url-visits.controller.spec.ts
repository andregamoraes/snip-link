import { Test, TestingModule } from '@nestjs/testing';
import { UrlVisitsController } from './url-visits.controller';

describe('UrlVisitsController', () => {
  let controller: UrlVisitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlVisitsController],
    }).compile();

    controller = module.get<UrlVisitsController>(UrlVisitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
