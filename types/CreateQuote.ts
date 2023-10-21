import {z} from 'zod';

export const createQuoteValidationSchema = z.object({
    userId: z.string(),
    quote: z.string(), 
    author: z.string(), 
    tag: z.string().optional()
});

export type CreateQuote = z.infer<typeof createQuoteValidationSchema>;