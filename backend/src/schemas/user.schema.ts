import { z } from "zod";

export const userCreateSchema = z.object({
    name: z.string().min(1, "Al least 1 character is required"),
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userGetByIdSchema = z.object({
    id: z.number().int(),
});
export const userGetDeletedByIdSchema = z.object({
    id: z.number().int(),
});
export const userDeleteSchema = z.object({
    id: z.number().int(),
});

export const userUpdateSchema = z.object({
    id: z.number().int(),
    name: z.string().min(1, "Al least 1 character is required"),
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userRestoreSchema = z.object({
    id: z.number().int(),
});
