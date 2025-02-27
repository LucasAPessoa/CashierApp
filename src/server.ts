import fastify from "fastify";

import { UserRoutes } from "./routes/user.routes";
import { CategoryRoutes } from "./routes/category.routes";

const app = fastify();

app.register(CategoryRoutes);
app.register(UserRoutes);

app.listen({ port: 3000, host: "localhost" }, () => {
    console.log("Server is running on http://localhost:3000");
});
