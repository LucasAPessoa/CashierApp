import { FastifyRequest, FastifyReply } from "fastify";
import { EntryRepository } from "../repositories/entry.repository";

export class EntryController {
    private static entryRepository = new EntryRepository();
}
