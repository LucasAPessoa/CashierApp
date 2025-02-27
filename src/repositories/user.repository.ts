import { prisma } from "../lib/prisma";

export class UserRepository {
    //Retorna um usuário pelo Email

    async findActiveUserByEmail(email: string) {
        return prisma.users.findUnique({
            where: {
                email: email,
                isDeleted: false,
            },
        });
    }

    //Retorna um usuário pelo Id

    async findActiveUserById(id: number) {
        return prisma.users.findUnique({
            where: {
                id: id,
                isDeleted: false,
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
                isDeleted: true,
            },
        });
    }

    //Retorna um usuário deletado pelo Id

    async findDeletedUserById(id: number) {
        return prisma.users.findUnique({
            where: {
                id: id,
                isDeleted: true,
            },
        });
    }

    //Retorna todos os usuários não deletados

    async findActiveUsers() {
        return prisma.users.findMany({
            where: {
                isDeleted: false,
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
                isDeleted: true,
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
