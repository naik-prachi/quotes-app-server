import { ArrayNotEmpty, IsArray, IsOptional, IsString } from "class-validator";

export class UpdateQuotesDto{
    
    // id: number;
    
    @IsOptional()
    @IsString()
    quote?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsString()
    @IsOptional()
    tags?: string;
}