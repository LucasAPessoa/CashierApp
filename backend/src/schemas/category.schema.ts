import { z } from "zod";

import { CategoryType } from "@prisma/client";

export const categoryCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.nativeEnum(CategoryType),
});

export const categoryGetByIdSchema = z.object({
    id: z.number().int(),
});

export const categoryDeleteSchema = z.object({
    id: z.number().int(),
});
