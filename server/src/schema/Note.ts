import { builder } from "../builder";
import { prisma } from "../db";
import { TagInput } from "./Tag";

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
      return await prisma.note.findMany({ ...query });
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
    tags: t.field({ type: [TagInput] }),
  }),
});

// input EditNoteInput{
//   title: String!
//   body: String!
// }
const EditNoteInput = builder.inputType("EditNoteInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    body: t.string({ required: true }),
  }),
});

// Same as saying
// type Mutation {
//   createNote(note: NewNoteInput!): Note
//   editNote(id: String!, note: EditNoteInput!): Note
//   deleteNote(id:String!): [Note]
// }
//
// Example mutation
// mutation CreateNoteMutation($note: NewNoteInput!,){
//   createNote(note: $note) {
//     id,
//     title,
//     body,
//     tags {
//       id,
//       label,
//     }
//   }
// }
// Another example mutation
// mutation EditNoteMutation($note: EditNoteInput!, $id: String!){
//   editNote(id: $id, note: $note) {
//     id
//     title
//     body
//     tags {
//       id
//       label
//     }
//   }
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
    resolve: async (query, parent, args) => {
      return await prisma.note.create({
        ...query,
        data: {
          title: args.note.title,
          body: args.note.body,
          tags: {
            connect: (args.note.tags ?? []).map((tag) => ({
              id: tag.id,
              label: tag.label,
            })),
          },
        },
      });
    },
  }),
  editNote: t.prismaField({
    type: "Note",
    args: {
      id: t.arg.string({ required: true }),
      note: t.arg({
        type: EditNoteInput,
        required: true,
      }),
    },
    resolve: async (query, parent, args) => {
      return await prisma.note.update({
        ...query,
        where: {
          id: args.id,
        },
        data: {
          title: args.note.title,
          body: args.note.body,
        },
      });
    },
  }),
  deleteNote: t.prismaField({
    type: ["Note"],
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args) => {
      // disconnect tag from note
      // await prisma.note.update({
      //   where: {
      //     id: args.id,
      //   },
      //   data: {
      //     tags: {
      //       // Disconnecting one to many relations by setting to an empty list
      //       set: [],
      //     },
      //   },
      // });
      await prisma.note.delete({
        where: {
          id: args.id,
        },
      });
      return await prisma.note.findMany();
    },
  }),
}));
