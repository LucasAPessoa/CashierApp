import { FastifyReply, FastifyRequest } from "fastify";

import { UserRepository } from "../repositories/user.repository";

export class UserController {
    private static userRepository = new UserRepository();

    static async createUser(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = request.body as {
            name: string;
            email: string;
            password: string;
        };

        const emailExists = await UserController.userRepository.findByEmail(
            email
        );

        const emailDeleted =
            await UserController.userRepository.findByEmailDeleted(email);

        if (emailExists) {
            return reply.code(400).send({
                message: "Email already exists",
            });
        }

        if (emailDeleted) {
            return reply.code(400).send({
                message: "Account already exists, but is deleted",
            });
        }

        const user = await UserController.userRepository.createUser(
            name,
            email,
            password
        );

        return reply.status(200).send(user);
    }

    static async getUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await UserController.userRepository.getUsers();

        return reply.status(200).send(users);
    }

    static async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const parsedId = parseInt(id);

        const idExists = await UserController.userRepository.findById(parsedId);

        if (!idExists) {
            return reply.code(404).send({
                message: "User not found",
            });
        }

        await UserController.userRepository.deleteUser(parsedId);

        return reply.code(204).send();
    }
}
