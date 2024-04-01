import { Test, TestingModule } from '@nestjs/testing';
import { PersonResistrationService } from './person-resistration.service';

describe('PersonResistrationService', () => {
  let service: PersonResistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonResistrationService],
    }).compile();

    service = module.get<PersonResistrationService>(PersonResistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
