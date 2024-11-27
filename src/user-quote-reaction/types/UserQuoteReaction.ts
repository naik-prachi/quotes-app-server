export interface UserQuoteReaction {
    id: string;
    like: boolean;
    dislikes: boolean;
    quoteId: string;
    userId: string;
}