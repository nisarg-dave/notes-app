import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema";

(async () => {
  const port = Number(process.env.API_PORT) || 4000;

  const server = new ApolloServer({
    schema,
  });

  // const serverUrl = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
