import { prisma } from "../lib/prisma";

export class UserRepository {
    //Retorna um usuário pelo Email

    async findActiveUserByEmail(email: string) {
        return prisma.users.findUnique({
            where: {
                email: email,
                deletedAt: null,
            },
        });
    }

    //Retorna um usuário pelo Id

    async findActiveUserById(id: number) {
        return prisma.users.findUnique({
            where: {
                id: id,
                deletedAt: null,
            },
        });
    }

    //Retorna um usuário, deletado ou não, pelo Id

    async findAllById(id: number) {
        return prisma.users.findMany({
            where: {
                id: id,
            },
        });
    }

    //Retorna um usuário, deletado ou não, pelo Email

    async findAllUsersByEmail(email: string) {
        return prisma.users.findMany({
            where: {
                email: email,
            },
        });
    }

    //Retorna um usuário deletado pelo Email

    async findDeleteUserByEmail(email: string) {
        return prisma.users.findUnique({
            where: {
                email: email,
                deletedAt: { not: null },
            },
        });
    }

    //Retorna um usuário deletado pelo Id

    async findDeletedUserById(id: number) {
        return prisma.users.findUnique({
            where: {
                id: id,
                deletedAt: { not: null },
            },
        });
    }

    //Retorna todos os usuários não deletados

    async findActiveUsers() {
        return prisma.users.findMany({
            where: {
                deletedAt: null,
            },
        });
    }

    //Retorna todos os usuários, deletados ou não

    async findAllUsers() {
        return prisma.users.findMany();
    }

    //Cria um usuário

    async createUser(name: string, email: string, password: string) {
        return prisma.users.create({
            data: {
                name,
                email,
                password,
            },
        });
    }

    //Deleta um usuário alternando o campo isDeleted para true

    async deleteUser(id: number) {
        return prisma.users.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }

    //Atualiza as informações (name, email, password) de um usuário

    async updateUser(
        id: number,
        name: string,
        email: string,
        password: string
    ) {
        return prisma.users.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                password,
            },
        });
    }
}
