import { Prisma, Entries } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class EntryRepository {
    async findActiveEntriesById(id: number): Promise<Entries | null> {
        return await prisma.entries.findUnique({
            where: {
                id,
                deletedAt: null,
            },
        });
    }

    async findActiveEntriesByCategory(id: number): Promise<Entries[]> {
        return await prisma.entries.findMany({
            where: {
                categoryId: id,
                deletedAt: null,
            },
        });
    }

    async findActiveEntries(): Promise<Entries[]> {
        return await prisma.entries.findMany({});
    }

    async createEntry(data: Prisma.EntriesCreateInput): Promise<Entries> {
        return await prisma.entries.create({
            data,
        });
    }

    async deleteEntry(id: number): Promise<Entries> {
        return prisma.entries.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }

    async updateEntry(
        id: number,
        data: Prisma.EntriesUpdateInput
    ): Promise<Entries> {
        return prisma.entries.update({
            where: {
                id,
            },
            data,
        });
    }
}
