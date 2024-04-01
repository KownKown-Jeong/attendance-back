import { Test, TestingModule } from '@nestjs/testing';
import { FamilyResistrationService } from './family-resistration.service';

describe('FamilyResistrationService', () => {
  let service: FamilyResistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyResistrationService],
    }).compile();

    service = module.get<FamilyResistrationService>(FamilyResistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
