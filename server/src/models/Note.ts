import { builder } from "../builder";

// This looks redundant as Prisma schema is already defined.
// However, defines the shape of the data in the database, while the GraphQL schema defines the data available in the API.
// See how Prisma schema has other relation fields that we don't expose over the API

builder.prismaObject("Note", {
  // Defining the fields with use of a function that has parameter that exposes Prisma fields
  // It basically defines a GraphQL type definition and registers it in the builder instances
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    body: t.exposeString("title"),
    tags: t.relation("tags"),
  }),
});
