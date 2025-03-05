import { prisma } from "../lib/prisma";

export class EntryRepository {
    async findActiveEntriesById(id: number) {
        return await prisma.entries.findMany({
            where: {
                categoryId: id,
                deletedAt: null,
            },
        });
    }

    async findActiveEntriesByCategory(id: number) {
        return await prisma.entries.findMany({
            where: {
                categoryId: id,
                deletedAt: null,
            },
        });
    }
}
