import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "./db";

// A SchemaBuilder is the core class of Pothos and is used to build types, and merge them into a graphql Schema
export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin],
  // Configuring Pothos Schema builder to use Prisma
  // Client is the instance of our prisma schema
  prisma: {
    client: prisma,
  },
});

// This is the code-first approach as pothos gives you helper functions to generate GraphQl schemas

// This registers a special GraphQL types that holds the definitions for each of your queries and acts as the entry point to your GraphQL API and allows for mutations
// Best to register them here and then add queryfields and mutation fields in the models and can only use them once
builder.queryType({});
builder.mutationType({});
