import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("Tag", {
  fields: (t) => ({
    id: t.exposeID("id"),
    label: t.exposeString("label"),
  }),
});

builder.queryField("tags", (t) =>
  t.prismaField({
    // Defines a fields that resolves to array Note type
    type: ["Tag"],
    // Resolve function to resolve the query. The query paramter is populated and built for us by Pothos
    resolve: async (query, root, args, ctx, info) => {
      return prisma.tag.findMany({ ...query });
    },
  })
);

export const NewTagInput = builder.inputType("NewTagInput", {
  fields: (t) => ({
    label: t.string({ required: true }),
  }),
});

// builder.mutationFields((t) => {
//   createTag: t.prismaField({
//     type: "Tag",
//     args: {
//       tag: t.arg({
//         type: NewTagInput,
//         required: true,
//       }),
//     },
//     resolve: (query, parent, args) => {
//       return prisma.tag.create({
//         ...query,
//         data: {
//           label: args.tag.label,
//         },
//       });
//     },
//   });
// });
