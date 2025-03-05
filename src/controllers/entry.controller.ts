import { FastifyRequest, FastifyReply } from "fastify";
import { EntryRepository } from "../repositories/entry.repository";

export class EntryController {
    private static entryRepository = new EntryRepository();

    static async getActiveCategories(req: FastifyRequest, reply: FastifyReply) {
        return await EntryController.entryRepository.findActiveEntries();
    }
}
