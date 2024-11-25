import { Module } from '@nestjs/common';
import { QuotesController } from './controllers/quotes/quotes.controller';
import { QuotesService } from './services/quotes/quotes.service';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService]
})
export class QuotesModule {}
