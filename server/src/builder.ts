import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "./db";

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin],
  // Configuring Pothos Schema builder to use Prisma
  // Client is the instance of our prisma schema
  prisma: {
    client: prisma,
  },
});

// This is the code-first approach as pothos gives you helper functions to generate GraphQl schemas

builder.queryType({});
