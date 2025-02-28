import { FastifyRequest, FastifyReply } from "fastify";
import { CategoriyRepository } from "../repositories/category.repository";
import { CategoryType } from "@prisma/client";
export class CategoryController {
    private static categoriyRepository = new CategoriyRepository();

    static async createCategory(request: FastifyRequest, reply: FastifyReply) {
        const { name, type } = request.body as {
            name: string;
            type: CategoryType;
        };

        const categoryExists =
            await CategoryController.categoriyRepository.findCategoryByName(
                name
            );

        if (categoryExists) {
            return reply.code(400).send({ message: "Category already exists" });
        }

        const category =
            await CategoryController.categoriyRepository.createCategory(
                name,
                type
            );

        return reply.status(200).send(category);
    }

    static async getAllCategories(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const categories =
            await CategoryController.categoriyRepository.findAllCategories();
        return reply.status(200).send(categories);
    }

    static async getCategoryById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const parsedId = parseInt(id);

        const category =
            await CategoryController.categoriyRepository.findActiveCategoryById(
                parsedId
            );

        if (!category) {
            return reply.code(404).send({ message: "Category not found" });
        }
        return reply.status(200).send(category);
    }

    static async getDeletedCategories(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        return CategoryController.categoriyRepository.findDeletedCategories();
    }

}
