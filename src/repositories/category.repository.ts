import { CategoryType } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class CategoriyRepository {
    async findActiveCategoryById(id: number) {
        return prisma.categories.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
        });
    }
}
