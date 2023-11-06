import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Tag", {
  fields: (t) => ({
    id: t.exposeID("id"),
    label: t.exposeString("label"),
  }),
});

// type Query {
//   tags: {
//     id: ID!
//     label: String!
//   }
// }
builder.queryFields((t) => ({
  tags: t.prismaField({
    // Defines a fields that resolves to array Note type
    type: ["Tag"],
    // Resolve function to resolve the query. The query paramter is populated and built for us by Pothos
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.tag.findMany({ ...query });
    },
  }),
}));

// input NewTagInput {
//   label: String!
// }
export const NewTagInput = builder.inputType("NewTagInput", {
  fields: (t) => ({
    label: t.string({ required: true }),
  }),
});

// input EditTagInput {
//   label: String!
// }
const EditTagInput = builder.inputType("EditTagInput", {
  fields: (t) => ({
    label: t.string({ required: true }),
  }),
});

// type Mutation {
//   createTag(tag: NewTagInput!): Tag
//   editTag(id: Int!, tag: EditTagInput!): Tag
//   deleteTag(id: Int!): [Tag]
// }
builder.mutationFields((t) => ({
  createTag: t.prismaField({
    type: "Tag",
    args: {
      tag: t.arg({
        type: NewTagInput,
        required: true,
      }),
    },
    resolve: async (query, parent, args) => {
      return await prisma.tag.create({
        ...query,
        data: {
          label: args.tag.label,
        },
      });
    },
  }),
  editTag: t.prismaField({
    type: "Tag",
    args: {
      id: t.arg.int({ required: true }),
      tag: t.arg({
        type: EditTagInput,
        required: true,
      }),
    },
    resolve: async (query, parent, args) => {
      return await prisma.tag.update({
        where: {
          id: args.id,
        },
        data: {
          label: args.tag.label,
        },
      });
    },
  }),
  deleteTag: t.prismaField({
    type: ["Tag"],
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, parent, args) => {
      await prisma.tag.delete({
        where: {
          id: args.id,
        },
      });
      return await prisma.tag.findMany();
    },
  }),
}));
