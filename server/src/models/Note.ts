import { builder } from "../builder";
import { prisma } from "../db";

// This looks redundant as Prisma schema is already defined.
// However, defines the shape of the data in the database, while the GraphQL schema defines the data available in the API.
// See how Prisma schema has other relation fields that we don't expose over the API

builder.prismaObject("Note", {
  // Defining the fields with use of a function that has parameter that exposes Prisma fields
  // It basically defines a GraphQL type definition and registers it in the builder instances
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    body: t.exposeString("body"),
    tags: t.relation("tags"),
  }),
});

builder.queryField("notes", (t) =>
  t.prismaField({
    // Defines a fields that resolves to array Note type
    type: ["Note"],
    // Resolve function to resolve the query. The query paramter is populated and built for us by Pothos
    resolve: async (query, root, args, ctx, info) => {
      return prisma.note.findMany({ ...query });
    },
  })
);
