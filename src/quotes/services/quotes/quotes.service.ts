import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuotesDto } from 'src/quotes/dto/CreateQuotes.dto';
import { UpdateQuotesDto } from 'src/quotes/dto/UpdateQuotes.dto';
import { Quotes } from 'src/quotes/types/Quotes';
import { Quotes as QuotesEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuotesService {

    // get the repository
    constructor(
        @InjectRepository(QuotesEntity)
        private readonly quotesRepository: Repository<QuotesEntity>
    ){}

    private quotes: Quotes[] = []

    getQuotes(){
        return this.quotesRepository.find();
    }

    getQuotesById(id: string): Promise<QuotesEntity>{
        const quote = this.quotesRepository.findOne({ where: { id }});
        if(quote)
            return quote;
        else
            throw new HttpException('Quote not found!', HttpStatus.BAD_REQUEST);
    }

    createQuotes(quotesDto: CreateQuotesDto){
        const { tags, ...rest } = quotesDto;
        const tagsArray = tags.split(';').map(tag => tag.trim());

        const newQuote = this.quotesRepository.create({
            ...rest,
            tags: tagsArray
        });
        return this.quotesRepository.save(newQuote);
    }

    async updateQuote(id: string, updateQuoteDto: UpdateQuotesDto){
        const quote = await this.quotesRepository.findOne({ where: { id } });
        if(quote){
            // if(updateQuoteDto.tags)
            //     updateQuoteDto.tags = updateQuoteDto.tags.split(';').map(tag => tag.trim());

            const { tags, ...rest } = updateQuoteDto;
            const tagsArray = tags.split(';').map(tag => tag.trim());

            const updatedTagDto = this.quotesRepository.create({
                ...rest,
                tags: tagsArray
            });
            
            const updatedQuote = this.quotesRepository.merge(quote, updatedTagDto);
            return await this.quotesRepository.save(updatedQuote);
        }
    }

    async deleteQuote(id: string){
        const quote = await this.quotesRepository.delete(id);
        if(quote.affected === 0) 
            throw new HttpException('Quote not found!', HttpStatus.BAD_REQUEST);
    }

    
    // return the tags in all the quotes
    async getTags(){
        const quote = await this.quotesRepository.find();
        const tagsArray = new Set<string>();

        quote.forEach(quote => {
            quote.tags.forEach(tag => tagsArray.add(tag));
        });

        return Array.from(tagsArray);
    }
}
