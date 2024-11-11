import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SuccessResDto } from './common/dto/success.res.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return success=true', () => {
      expect(appController.getHealth()).toStrictEqual(new SuccessResDto());
    });
  });
});
