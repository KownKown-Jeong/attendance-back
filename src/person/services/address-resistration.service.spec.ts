import { Test, TestingModule } from '@nestjs/testing';
import { AddressResistrationService } from './address-resistration.service';

describe('ARS', () => {
  let service: AddressResistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressResistrationService],
    }).compile();

    service = module.get<AddressResistrationService>(AddressResistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
