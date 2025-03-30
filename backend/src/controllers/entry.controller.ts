import { FastifyRequest, FastifyReply } from "fastify";
import { EntryRepository } from "../repositories/entry.repository";
import { entryCreateSchema, entryUpdateSchema } from "../schemas/entry.schema";

export class EntryController {
    private static entryRepository = new EntryRepository();

    //Retorna todas as entradas ativas
    static async getActiveEntries() {
        return await EntryController.entryRepository.findActiveEntries();
    }

    //Cria uma nova entrada
    static async createEntry(request: FastifyRequest, reply: FastifyReply) {
        //Converte o body da requisição para a interface de entrada
        const newEntry = entryCreateSchema.safeParse(request.body);

        //Verifica se a criação da entrada foi feita corretamente
        if (!newEntry.success) {
            return reply.code(400).send({
                message: "Validation error",
                errorMessage: newEntry.error.format(),
            });
        }

        //Desestrutura a entrada criada
        const { user, category, value, description } = newEntry.data;

        //Verifica se algum dos campos é nulo
        if (!user || !category || !value || !description) {
            return reply.code(400).send({ message: "All fields are required" });
        }

        //Relaciona os campos de chave estrangeira com suas respectivas tabelas
        const categoryObject = { connect: { id: category } };
        const userObject = { connect: { id: user } };

        //Cria a entrada no banco de dados
        return EntryController.entryRepository.createEntry({
            user: userObject,
            category: categoryObject,
            value,
            description,
        });
    }

    //Atualiza uma entrada
    static async updateEntry(request: FastifyRequest, reply: FastifyReply) {
        //Converte o body da requisição para a interface de entrada
        const entryContent = entryUpdateSchema.safeParse(request.body);

        //Verifica se a criação da entrada foi feita corretamente e retorna erro caso não
        if (!entryContent.success) {
            return reply.code(400).send({
                message: "Validation error",
                errorMessage: entryContent.error.format(),
            });
        }

        //Desestrutura o conteúdo do update
        const { entryId, category, value, description } = entryContent.data;

        //Verifica se o id da entrada é válido e retorna erro caso seja nulo
        if (!entryId) {
            return reply.code(400).send({ message: "Invalid entry id" });
        }

        //Verifica se algum dos campos é nulo e retorna erro caso algum seja nulo
        if (
            category === undefined &&
            value === undefined &&
            description === undefined
        ) {
            return reply
                .code(400)
                .send({ message: "At least one field is required" });
        }

        //Relaciona os campos de chave estrangeira com suas respectivas tabelas
        const categoryObject = { connect: { id: category } };

        //Atualiza a entrada no banco de dados e retorna a entrada atualizada
        const updatedEntry = await EntryController.entryRepository.updateEntry(
            entryId,
            { category: categoryObject, value: value, description: description }
        );
        return reply.code(200).send(updatedEntry);
    }

    //Deleta uma entrada
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
