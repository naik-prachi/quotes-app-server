import { Test, TestingModule } from '@nestjs/testing';
import { UserQuoteReactionController } from './user-quote-reaction.controller';

describe('UserQuoteReactionController', () => {
  let controller: UserQuoteReactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQuoteReactionController],
    }).compile();

    controller = module.get<UserQuoteReactionController>(UserQuoteReactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
