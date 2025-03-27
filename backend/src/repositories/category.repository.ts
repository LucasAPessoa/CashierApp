import { CategoryType } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class CategoryRepository {
    //Retorna uma categoria pelo Id
    async findActiveCategoryById(id: number) {
        return prisma.categories.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
        });
    }

    //Retorna uma categoria deletada pelo Id
    async findDeletedCategoryById(id: number) {
        return prisma.categories.findUnique({
            where: {
                id: id,
                deletedAt: { not: null },
            },
        });
    }

    //Retorna uma categoria, deletada ou não, pelo Id
    async findAllCategoryById(id: number) {
        return prisma.categories.findUnique({
            where: {
                id: id,
            },
        });
    }

    //Retorna todas as categorias
    async findAllCategories() {
        return prisma.categories.findMany();
    }

    //Retorna todas as categorias deletadas
    async findDeletedCategories() {
        return prisma.categories.findMany({
            where: {
                deletedAt: { not: null },
            },
        });
    }

    //Retorna todas as categorias ativas
    async findActiveCategories() {
        return prisma.categories.findMany({
            where: {
                deletedAt: null,
            },
        });
    }

    //Cria uma nova categoria
    async createCategory(name: string, type: CategoryType) {
        return prisma.categories.create({
            data: {
                name,
                type,
            },
        });
    }

    //Retorna uma categoria pelo nome
    async findCategoryByName(name: string) {
        return prisma.categories.findFirst({
            where: {
                name: name,
            },
        });
    }

    //Deleta uma categoria pelo Id

    async deleteCategory(id: number) {
        return prisma.categories.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
