import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticatedGuard, AuthorisationGuard } from 'src/auth/utils/Local.guard';
import { CreateQuotesDto } from 'src/quotes/dto/CreateQuotes.dto';
import { UpdateQuotesDto } from 'src/quotes/dto/UpdateQuotes.dto';
import { QuotesService } from 'src/quotes/services/quotes/quotes.service';

@Controller('quotes')
export class QuotesController {
    constructor(private quotesService: QuotesService){}

    @Get()
    getQuotes(){
        return this.quotesService.getQuotes();
    }

    @UseGuards(AuthenticatedGuard)
    @Post()
    @UsePipes(ValidationPipe)
    createQuote(@Body() quoteData: CreateQuotesDto){
        // console.log(quoteData);
        this.quotesService.createQuotes(quoteData);
        return { message: 'Quote created successfully', quoteData};
    }

    @UseGuards(AuthenticatedGuard, AuthorisationGuard)
    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateQuote(
        @Param('id') id: string,
        @Body() quoteData: UpdateQuotesDto
    ){
        const updatedQuote = await this.quotesService.updateQuote(id, quoteData);
        return { message: 'Quote updated successfully', updatedQuote };
    }

    @UseGuards(AuthenticatedGuard, AuthorisationGuard)
    @Delete(':id')
    async deleteQuote(@Param('id') id: string){
        await this.quotesService.deleteQuote(id);
        return { message: 'Quote deleted successfully' };
    }

    @Get(':id')
    getQuoteById(@Param('id') id: string){
        const quote = this.quotesService.getQuotesById(id);
        return quote;
    }

    @Get('tag/all')
    async getTags(){
        const tags = await this.quotesService.getTags();
        return tags;
    }

    @Patch(':id/like/up')
    likeQuote(){}

    @Patch(':id/dislike/up')
    dislikeQuote(){}

    @Patch(':id/like/down')
    removeLikeOnQuote(){}

    @Patch(':id/dislike/down')
    removeDislikeOnQuote(){}
}