import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/category.controller";

export async function CategoryRoutes(app: FastifyInstance) {
    app.post("/categories", CategoryController.createCategory);
    app.get("/categories", CategoryController.listAllCategories);
    app.get("/categories/:id", CategoryController.getCategoryById);
    app.delete("/deleteCategory/:id", CategoryController.deleteCategory);
    app.get("/categories/deleted", CategoryController.listDeletedCategories);
    app.get("/categories/active", CategoryController.listActiveCategories);
}
