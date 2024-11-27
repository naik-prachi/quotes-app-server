import { Module } from '@nestjs/common';
import { UserQuoteReactionController } from './controllers/user-quote-reaction/user-quote-reaction.controller';
import { UserQuoteReactionService } from './services/user-quote-reaction/user-quote-reaction.service';

@Module({
  controllers: [UserQuoteReactionController],
  providers: [UserQuoteReactionService]
})
export class UserQuoteReactionModule {}
