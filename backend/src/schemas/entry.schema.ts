import { z } from "zod";

export const entryCreateSchema = z.object({
    user: z.number(),
    category: z.number(),
    value: z.number(),
    description: z.string().min(1, "Description is required"),
});

export const entryUpdateSchema = z.object({
    entryId: z.number(),
    category: z.number(),
    value: z.number(),
    description: z.string(),
});

export const entryDeleteSchema = z.object({
    entryId: z.number(),
});

export const entryGetByIdSchema = z.object({
    entryId: z.number(),
});
