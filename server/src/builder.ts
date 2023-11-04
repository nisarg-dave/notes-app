import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "./db";

// A SchemaBuilder is the core class of Pothos and is used to build tpyes, and merge them into a graphql Schema
export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin],
  // Configuring Pothos Schema builder to use Prisma
  // Client is the instance of our prisma schema
  prisma: {
    client: prisma,
  },
});

// This is the code-first approach as pothos gives you helper functions to generate GraphQl schemas

// This registers a special GraphQL type that holds the definitions for each of your queries and acts as the entry point to your GraphQL API
builder.queryType({});
builder.mutationType({});
