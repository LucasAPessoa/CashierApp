import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";

export async function UserRoutes(app: FastifyInstance) {
    app.post("/users", UserController.createUser);
    app.get("/users", UserController.getUsers);
    app.patch("/users/:id", UserController.deleteUser);
    app.get("/users/:id", UserController.getUserById);
}
