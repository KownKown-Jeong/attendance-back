import { Test, TestingModule } from '@nestjs/testing';
import { UserResistrationService } from './user-resistration.service';

describe('UserResistrationService', () => {
  let service: UserResistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResistrationService],
    }).compile();

    service = module.get<UserResistrationService>(UserResistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
