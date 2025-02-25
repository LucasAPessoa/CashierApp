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

        if (emailExists) {
            return reply.code(400).send({
                message: "Email already exists",
            });
        }

        const user = await UserController.userRepository.createUser(
            name,
            email,
            password
        );

        return reply.status(200).send(user);
    }
}
