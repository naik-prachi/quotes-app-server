import { ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class CreateQuotesDto{

    @IsString()
    quote: string;

    @IsString()
    author: string;

    // @IsArray()
    // @ArrayNotEmpty()
    @IsString()
    tags: string;
}