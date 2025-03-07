import { FastifyInstance } from "fastify";
import { EntryController } from "../controllers/entry.controller";

export async function EntryRoutes(app: FastifyInstance) {
    app.post("/createEntry", EntryController.createEntry);
    app.patch("/deleteEntry/:id", EntryController.deleteEntry);
    app.patch("/updateEntry/:id", EntryController.updateEntry);
}
