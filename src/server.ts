import fastify from "fastify";

const app = fastify();

app.listen({ port: 3000, host: "localhost" }, () => {
    console.log("Server is running on http://localhost:3000");
});
