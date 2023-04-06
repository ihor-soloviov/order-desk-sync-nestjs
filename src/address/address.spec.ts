import { Test, TestingModule } from '@nestjs/testing';
import { Address } from './address.provider';

describe('Address', () => {
  let provider: Address;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Address],
    }).compile();

    provider = module.get<Address>(Address);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
