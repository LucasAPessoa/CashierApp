import { FastifyReply, FastifyRequest } from "fastify";

import { UserRepository } from "../repositories/user.repository";

export class UserController {
    private static userRepository = new UserRepository();

    //Cria um novo usuário

    static async createUser(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = request.body as {
            name: string;
            email: string;
            password: string;
        };

        const emailExists =
            await UserController.userRepository.findActiveUserByEmail(email);

        const emailDeleted =
            await UserController.userRepository.findDeleteUserByEmail(email);

        if (emailExists) {
            return reply.code(400).send({
                message: "Email already exists",
            });
        }

        if (emailDeleted) {
            return reply.code(400).send({
                message: "Account already exists, but was deleted",
            });
        }

        const user = await UserController.userRepository.createUser(
            name,
            email,
            password
        );

        return reply.status(200).send(user);
    }

    //Retorna todos os usuários ativos

    static async getActiveUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await UserController.userRepository.findActiveUsers();

        return reply.status(200).send(users);
    }

    //Retorna um usuário pelo Id

    static async getActiveUserById(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id } = request.params as { id: string };

        const parsedId = parseInt(id);

        const user = await UserController.userRepository.findActiveUserById(
            parsedId
        );

        if (!user) {
            return reply.code(404).send("User not found");
        }

        return reply.status(200).send(user);
    }

    //Retorna um usuário deletado pelo Id

    static async getDeletedUserById(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { id } = request.params as { id: string };

        const parsedId = parseInt(id);

        const user = await UserController.userRepository.findDeletedUserById(
            parsedId
        );

        if (!user) {
            return reply.code(404).send({
                message: "User not found",
            });
        }

        return reply.status(200).send(user);
    }

    //Retorna todos os usuários, deletados ou não

    static async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await UserController.userRepository.findAllUsers();

        return reply.code(200).send(users);
    }

    //Troca o campo isDeleted de um usuário para true

    static async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const parsedId = parseInt(id);

        const idExists = await UserController.userRepository.findActiveUserById(
            parsedId
        );

        if (!idExists) {
            return reply.code(404).send({
                message: "User not found",
            });
        }

        await UserController.userRepository.deleteUser(parsedId);

        return reply.code(204).send();
    }

    //Atualiza o name, email e password de um usuário

    static async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const parsedId = Number(id);

        const { name, email, password } = request.body as {
            name: string;
            email: string;
            password: string;
        };

        const user = await UserController.userRepository.findAllById(parsedId);

        if (user) {
            return UserController.userRepository.updateUser(
                parsedId,
                name,
                email,
                password
            );
        }
        return reply.code(404).send({ message: "User not found" });
    }

    //Restaura um usuário deletado

    static async restoreUser(request: FastifyRequest, reply: FastifyReply) {
        const { email } = request.params as { email: string };

        if (!email) {
            return reply.code(400).send({ message: "Email is required" });
        }

        const user = await UserController.userRepository.findDeleteUserByEmail(
            email
        );

        if (!user) {
            return reply.code(404).send({ message: "User not found" });
        }

        return UserController.userRepository.restoreUserByEmail(email);
    }
}
