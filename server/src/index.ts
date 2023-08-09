import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { schema } from "./schema";

const port = Number(process.env.API_PORT) || 4000;

const yoga = createYoga({
  schema: schema,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);
});
