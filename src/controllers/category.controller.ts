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
}
