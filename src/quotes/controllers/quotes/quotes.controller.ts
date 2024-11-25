import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateQuotesDto } from 'src/quotes/dtos/CreateQuotes.dto';
import { QuotesService } from 'src/quotes/services/quotes/quotes.service';

@Controller('quotes')
export class QuotesController {
    constructor(private quotesService: QuotesService){}

    @Get()
    getQuotes(){
        return this.quotesService.getQuotes();
    }

    @Post()
    createQuote(@Body() quoteData: CreateQuotesDto){
        console.log(quoteData);
        this.quotesService.createQuotes(quoteData);
        return { message: 'Quote created successfully', quoteData};
    }

    @Patch(':id')
    updateQuote(@Param('id', ParseIntPipe) id: number){}

    @Delete(':id')
    deleteQuote(@Param('id', ParseIntPipe) id: number){}

    @Get(':id')
    getQuoteById(@Param('id', ParseIntPipe) id: number){
        const quote = this.quotesService.getQuotesById(id);
        if (quote) return quote;
        throw new HttpException('Quote is not found!', HttpStatus.BAD_REQUEST);
    }

    @Get(':tag')
    getQuoteByTag(@Param('tag') tag: string){
        const quote = this.quotesService.getQuotesByTag(tag);
        if (quote) return quote;
        throw new HttpException('Tag is not found!', HttpStatus.BAD_REQUEST);
    }
}
