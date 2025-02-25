import { UserRepository } from "../repositories/user.repository";
export class UserController {
    private static userRepository = new UserRepository();
}
