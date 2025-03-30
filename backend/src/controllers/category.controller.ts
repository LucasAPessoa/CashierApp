import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryRepository } from "../repositories/category.repository";
import {
    categoryCreateSchema,
    categoryGetByIdSchema,
    categoryDeleteSchema,
} from "../schemas/category.schema";

export class CategoryController {
    private static CategoryRepository = new CategoryRepository();

    static async createCategory(request: FastifyRequest, reply: FastifyReply) {
        const parse = categoryCreateSchema.safeParse(request.body);

        if (!parse.success) {
            return reply.code(400).send({
                message: "Validation error",
                errorMessage: parse.error.format(),
            });
        }

        const { name, type } = parse.data;

        const categoryExists =
            await CategoryController.CategoryRepository.findCategoryByName(
                name
            );

        if (categoryExists) {
            return reply.code(400).send({ message: "Category already exists" });
        }

        const category =
            await CategoryController.CategoryRepository.createCategory(
                name,
                type
            );

        return reply.status(200).send(category);
    }

    static async listAllCategories(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const categories =
            await CategoryController.CategoryRepository.findAllCategories();
        return reply.status(200).send(categories);
    }

    static async getCategoryById(request: FastifyRequest, reply: FastifyReply) {
        const parse = categoryGetByIdSchema.safeParse(request.params);

        if (!parse.success) {
            return reply.code(400).send({
                message: "Validation error",
                errorMessage: parse.error.format(),
            });
        }

        const parsedId = parse.data.id;

        const category =
            await CategoryController.CategoryRepository.findActiveCategoryById(
                parsedId
            );

        if (!category) {
            return reply.code(404).send({ message: "Category not found" });
        }
        return reply.status(200).send(category);
    }

    static async listDeletedCategories(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        return CategoryController.CategoryRepository.findDeletedCategories();
    }

    static async listActiveCategories(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        return CategoryController.CategoryRepository.findActiveCategories();
    }

    static async deleteCategory(request: FastifyRequest, reply: FastifyReply) {
        const parse = categoryDeleteSchema.safeParse(request.params);

        if (!parse.success) {
            return reply.code(400).send({
                message: "Validation error",
                errorMessage: parse.error.format(),
            });
        }

        const parsedId = parse.data.id;

        const category =
            await CategoryController.CategoryRepository.findAllCategoryById(
                parsedId
            );

        if (!category) {
            return reply.code(404).send({ message: "Category not found" });
        }

        await CategoryController.CategoryRepository.deleteCategory(parsedId);
        return reply.status(200).send();
    }
}
