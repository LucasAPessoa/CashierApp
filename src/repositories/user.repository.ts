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
}
