export class CreateQuotesDto{
    id: number;
    quote: string;
    like: number;
    dislike: number;
    author: string;
    tags: string[];
}