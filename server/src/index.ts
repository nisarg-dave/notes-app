import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
// 2
const port = Number(process.env.API_PORT) || 4000;

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
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
// 3
const server = createServer(yoga);
// 4
server.listen(4000, () => {
  console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);
});
