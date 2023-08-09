import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

const port = Number(process.env.API_PORT) || 4000;

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from Yoga!",
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);
});
