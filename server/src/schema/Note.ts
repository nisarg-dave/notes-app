import { builder } from "../builder";
import { prisma } from "../db";
import { NewTagInput } from "./Tag";

// This looks redundant as Prisma schema is already defined.
// However, Prisma defines the shape of the data in the database, while the GraphQL schema defines the data available in the API.
// See how Prisma schema has other relation fields that we don't expose over the API

// this looks like doing something like this
// type Note {
//   id: ID!
//   title: String!
//   body: String!
//   tags: [Tag!]!
// }
//  We are using Prisma Object because of the Pothos' Prisma plugin
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

// Equivalent of doing something like this
// type Query {
//   notes: [Note!]!
// }
builder.queryFields((t) => ({
  // Defines a field that resolves to some type in Prisma Schema
  notes: t.prismaField({
    // Defines a fields that resolves to array Note type
    type: ["Note"],
    // Resolve function to resolve the query. The query paramter is populated and built for us by Pothos
    resolve: async (query, root, args, ctx, info) => {
      // query basically has the include and select fields
      return prisma.note.findMany({ ...query });
    },
  }),
}));

// Same as saying
// input NewNoteInput {
//   title: String!
//   body: String!
//   tags: [Tag!]!
// }
const NewNoteInput = builder.inputType("NewNoteInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    body: t.string({ required: true }),
    tags: t.field({ type: [NewTagInput] }),
  }),
});

// Same as saying
// type Mutation {
//   createNote(note: NewNoteInput!): Note
// }
builder.mutationFields((t) => ({
  createNote: t.prismaField({
    type: "Note",
    args: {
      note: t.arg({
        type: NewNoteInput,
        required: true,
      }),
    },
    resolve: (query, parent, args) => {
      return prisma.note.create({
        ...query,
        data: {
          title: args.note.title,
          body: args.note.body,
          tags: {
            create: (args.note.tags ?? []).map((tag) => ({
              label: tag.label,
            })),
          },
        },
      });
    },
  }),
}));
