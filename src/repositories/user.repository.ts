import { prisma } from "../lib/prisma";

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.users.findUnique({
            where: {
                email: email,
                isDeleted: false,
            },
        });
    }

    async findById(id: number) {
        return prisma.users.findUnique({
            where: {
                id: id,
                isDeleted: false,
            },
        });
    }

    async findAllById(id: number) {
        return prisma.users.findMany({
            where: {
                id: id,
            },
        });
    }

    async findAllByEmail(email: string) {
        return prisma.users.findMany({
            where: {
                email: email,
            },
        });
    }

    async findByEmailDeleted(email: string) {
        return prisma.users.findUnique({
            where: {
                email: email,
                isDeleted: true,
            },
        });
    }

    async findByIdDeleted(id: number) {
        return prisma.users.findUnique({
            where: {
                id: id,
                isDeleted: true,
            },
        });
    }

    async createUser(name: string, email: string, password: string) {
        return prisma.users.create({
            data: {
                name,
                email,
                password,
            },
        });
    }

    async getUsers() {
        return prisma.users.findMany({
            where: {
                isDeleted: false,
            },
        });
    }

    async findAllUsers() {
        return prisma.users.findMany();
    }

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
}
