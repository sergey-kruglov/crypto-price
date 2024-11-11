import { Test, TestingModule } from '@nestjs/testing';
import { OnApplicationShutdownHandler } from './shutdown.hook';

describe('OnApplicationShutdownHandler', () => {
  let service: OnApplicationShutdownHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnApplicationShutdownHandler],
    }).compile();

    service = module.get<OnApplicationShutdownHandler>(
      OnApplicationShutdownHandler,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be called with status', () => {
    const spy = jest.spyOn(service, 'onApplicationShutdown');
    service.onApplicationShutdown('SIGTERM');
    expect(spy).toHaveBeenCalledWith('SIGTERM');
  });
});
