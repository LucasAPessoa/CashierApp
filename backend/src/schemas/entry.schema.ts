import { z } from "zod";

export const createEntrySchema = z.object({
    user: z.number(),
    category: z.number(),
    value: z.number(),
    description: z.string().min(1, "Description is required"),
});

export const updateIdSearchEntrySchema = z.object({
    entryId: z.number(),
    category: z.number(),
    value: z.number(),
    description: z.string(),
});
