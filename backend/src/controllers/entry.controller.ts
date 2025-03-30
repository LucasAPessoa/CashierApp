import { FastifyRequest, FastifyReply } from "fastify";
import { EntryRepository } from "../repositories/entry.repository";
import {
    createEntrySchema,
    updateIdSearchEntrySchema,
} from "../schemas/entry.schema";

export class EntryController {
    private static entryRepository = new EntryRepository();

    static async getActiveEntries(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        return await EntryController.entryRepository.findActiveEntries();
    }

    static async createEntry(request: FastifyRequest, reply: FastifyReply) {
        const newEntry = createEntrySchema.safeParse(request.body);

        if (!newEntry.success) {
            return reply.code(400).send({
                message: "Validation error",
                errorMessage: newEntry.error.format(),
            });
        }

        const { user, category, value, description } = newEntry.data;
        if (!user || !category || !value || !description) {
            return reply.code(400).send({ message: "All fields are required" });
        }
        const categoryObject = { connect: { id: category } };
        const userObject = { connect: { id: user } };

        return EntryController.entryRepository.createEntry({
            user: userObject,
            category: categoryObject,
            value,
            description,
        });
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

    static async getEntryById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const parsedId = parseInt(id);

        if (!parsedId) {
            return reply.code(400).send({ message: "Invalid entry id" });
        }
        const entry =
            await EntryController.entryRepository.findActiveEntriesById(
                parsedId
            );

        if (!entry) {
            return reply.code(404).send({ message: "Entry not found" });
        }

        return reply.status(200).send(entry);
    }
}
