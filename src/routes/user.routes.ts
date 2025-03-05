import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";

export async function UserRoutes(app: FastifyInstance) {
    //Cria um novo usuário
    app.post("/users", UserController.createUser);

    //Lista usuários ativos
    app.get("/users", UserController.getActiveUsers);

    //Deleta um usuário
    app.patch("/users/:id", UserController.deleteUser);

    //Retorna um usuário ativo pelo Id
    app.get("/users/:id", UserController.getActiveUserById);

    //Retorna um usuário deletado pelo Id
    app.get("/deletedUsers/:id", UserController.getDeletedUserById);

    //Atualiza name, password e email de um usuário
    app.put("/users/:id", UserController.updateUser);

    //Retorna todos os usuários, deltados ou ativos
    app.get("/usersAll", UserController.getAllUsers);

    //Restaura um usuário deletado
    app.patch("/restoreUserByEmail/:email", UserController.restoreUser);
}
