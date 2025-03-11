import { Prisma, Entries } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class EntryRepository {
    // Retorna uma entrada pelo id
    async findActiveEntriesById(id: number): Promise<Entries | null> {
        return await prisma.entries.findUnique({
            where: {
                id,
                deletedAt: null,
            },
        });
    }

    // Retorna todas as entradas pela categoria
    async findActiveEntriesByCategory(id: number): Promise<Entries[]> {
        return await prisma.entries.findMany({
            where: {
                categoryId: id,
                deletedAt: null,
            },
        });
    }

    // Retorna todas as entradas ativas
    async findActiveEntries(): Promise<Entries[]> {
        return await prisma.entries.findMany({});
    }

    // Cria uma nova entrada
    async createEntry(data: Prisma.EntriesCreateInput): Promise<Entries> {
        return await prisma.entries.create({
            data,
        });
    }

    // Deleta uma entrada alternando o campo deletedAt para a data atual
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

    // Altera as informações de uma entrada
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
