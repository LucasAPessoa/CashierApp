import { FastifyRequest, FastifyReply } from "fastify";
import { EntryRepository } from "../repositories/entry.repository";

export class EntryController {
    private static entryRepository = new EntryRepository();

    static async getActiveCategories(req: FastifyRequest, reply: FastifyReply) {
        return await EntryController.entryRepository.findActiveEntries();
    }

    static async createEntry(req: FastifyRequest, reply: FastifyReply) {
        const { userId, categoryId, value, description } = req.body as {
            userId: number;
            categoryId: number;
            value: number;
            description: string;
        };

        if (!userId || !categoryId || !value || !description) {
            return reply.code(400).send({ message: "All fields are required" });
        }
        return EntryController.entryRepository.createEntry(
            userId,
            categoryId,
            value,
            description
        );
    }
}
