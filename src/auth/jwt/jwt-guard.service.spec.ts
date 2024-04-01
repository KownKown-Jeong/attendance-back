// src/auth/jwt/jwt-guard.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JwtGuard } from './jwt-guard.service';

describe('JwtGuard', () => {
  let service: JwtGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtGuard],
    }).compile();

    service = module.get<JwtGuard>(JwtGuard);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
