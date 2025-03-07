import { FastifyRequest, FastifyReply } from "fastify";
import { EntryRepository } from "../repositories/entry.repository";

export class EntryController {
    private static entryRepository = new EntryRepository();

    static async getActiveEntries(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        return await EntryController.entryRepository.findActiveEntries();
    }

    static async createEntry(request: FastifyRequest, reply: FastifyReply) {
        const { userId, categoryId, value, description } = request.body as {
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

    static async updateEntry(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const parsedId = parseInt(id);

        if (!parsedId) {
            return reply.code(400).send({ message: "Invalid entry id" });
        }
        const { categoryId, value, description } = request.body as {
            categoryId: number;
            value: number;
            description: string;
        };
        if (!categoryId && !value && !description) {
            return reply
                .code(400)
                .send({ message: "At least one field is required" });
        }
        return await EntryController.entryRepository.updateEntry(
            parsedId,
            value,
            description,
            categoryId
        );
    }

    static async deleteEntry(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const parsedId = parseInt(id);
        const entry =
            await EntryController.entryRepository.findActiveEntriesById(
                parsedId
            );
        if (!entry) {
            return reply.code(404).send({ message: "Category not found" });
        }

        await EntryController.entryRepository.deleteEntry(parsedId);
        return reply.status(200).send(entry);
    }
}
