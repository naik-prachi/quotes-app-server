import { Module } from '@nestjs/common';
import { QuotesController } from './controllers/quotes/quotes.controller';
import { QuotesService } from './services/quotes/quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotes } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Quotes])],
  controllers: [QuotesController],
  providers: [QuotesService]
})
export class QuotesModule {}
