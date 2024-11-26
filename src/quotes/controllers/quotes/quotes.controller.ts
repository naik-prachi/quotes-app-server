import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateQuotesDto } from 'src/quotes/dtos/CreateQuotes.dto';
import { UpdateQuotesDto } from 'src/quotes/dtos/UpdateQuotes.dto';
import { QuotesService } from 'src/quotes/services/quotes/quotes.service';

@Controller('quotes')
export class QuotesController {
    constructor(private quotesService: QuotesService){}

    @Get()
    getQuotes(){
        return this.quotesService.getQuotes();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createQuote(@Body() quoteData: CreateQuotesDto){
        // console.log(quoteData);
        this.quotesService.createQuotes(quoteData);
        return { message: 'Quote created successfully', quoteData};
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateQuote(
        @Param('id', ParseIntPipe) id: number,
        @Body() quoteData: UpdateQuotesDto
    ){
        const updatedQuote = await this.quotesService.updateQuote(id, quoteData);
        return { message: 'Quote updated successfully', updatedQuote };
    }

    @Delete(':id')
    async deleteQuote(@Param('id', ParseIntPipe) id: number){
        await this.quotesService.deleteQuote(id);
        return { message: 'Quote deleted successfully' };
    }

    @Get(':id')
    getQuoteById(@Param('id', ParseIntPipe) id: number){
        const quote = this.quotesService.getQuotesById(id);
        return quote;
        // if (quote) return quote;
        // throw new HttpException('Quote is not found!', HttpStatus.BAD_REQUEST);
    }

    @Get('tag/all')
    async getTags(){
        const tags = await this.quotesService.getTags();
        return tags;
    }
}
