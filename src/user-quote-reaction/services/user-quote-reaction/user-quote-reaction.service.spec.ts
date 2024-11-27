import { Test, TestingModule } from '@nestjs/testing';
import { UserQuoteReactionService } from './user-quote-reaction.service';

describe('UserQuoteReactionService', () => {
  let service: UserQuoteReactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQuoteReactionService],
    }).compile();

    service = module.get<UserQuoteReactionService>(UserQuoteReactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
