import { Injectable } from '@nestjs/common';
import { CreateQuotesDto } from 'src/quotes/dtos/CreateQuotes.dto';
import { Quotes } from 'src/quotes/types/Quotes';

@Injectable()
export class QuotesService {

    private fakeQuotes: Quotes[] = [
        {
            id: 1,
            quote: "software is great combination of artistry",
            author: "Bill Gates",
            like: 44,
            dislike: 2,
            tags: ["software", "technology"]
        },
        {
            id: 2,
            quote: "software is great",
            author: "Jane Doe",
            like: 444,
            dislike: 20,
            tags: ["software"]
        }
    ]

    getQuotes(){
        return this.fakeQuotes;
    }

    getQuotesById(id: number){
        return this.fakeQuotes.find((quote) => quote.id === id);
    }

    getQuotesByTag(tag: string){
        return this.fakeQuotes.filter((quote) => quote.tags.includes(tag));
    }

    createQuotes(quotesDto: CreateQuotesDto){
        const newQuote: Quotes = {
            id: this.fakeQuotes.length + 1,
            quote: quotesDto.quote,
            author: quotesDto.author,
            like: quotesDto.like,
            dislike: quotesDto.dislike,
            tags: quotesDto.tags,
        };

        this.fakeQuotes.push(newQuote);
    }
}
