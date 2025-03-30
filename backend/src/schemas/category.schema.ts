import { z } from "zod";

import { CategoryType } from "@prisma/client";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.nativeEnum(CategoryType),
});

export const idParamSchema = z.object({
    id: z.number().int(),
});
