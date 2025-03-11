import fastify from "fastify";

import { UserRoutes } from "./routes/user.routes";
import { CategoryRoutes } from "./routes/category.routes";
import { EntryRoutes } from "./routes/entry.routes";

const app = fastify();

app.register(CategoryRoutes);
app.register(UserRoutes);
app.register(EntryRoutes);

const PORT = 3000;

app.listen({ port: PORT, host: "localhost" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running on ${address}`);
});
