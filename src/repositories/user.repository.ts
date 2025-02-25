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
}
