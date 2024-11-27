import { isBoolean, IsBoolean } from "class-validator";

export class UserQuoteReactionDto{

    @IsBoolean()
    like: boolean;

    @IsBoolean()
    dislike: boolean;



}