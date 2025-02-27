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

    async findDeletedCategoryById(id: number) {
        return prisma.categories.findUnique({
            where: {
                id: id,
                deletedAt: { not: null },
            },
        });
    }

    async findAllCategoryById(id: number) {
        return prisma.categories.findUnique({
            where: {
                id: id,
            },
        });
    }

    async findAllCategories() {
        return prisma.categories.findMany();
    }
    async findAllDeletedCategories() {
        return prisma.categories.findMany({
            where: {
                deletedAt: { not: null },
            },
        });
    }
    async findAllActiveCategories() {
        return prisma.categories.findMany({
            where: {
                deletedAt: null,
            },
        });
    }

    async createCategory(name: string, type: CategoryType) {
        return prisma.categories.create({
            data: {
                name,
                type,
            },
        });
    }

    async findCategoryByName(name: string) {
        return prisma.categories.findFirst({
            where: {
                name: name,
            },
        });
    }
}
