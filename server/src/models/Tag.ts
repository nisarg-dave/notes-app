import { builder } from "../builder";

builder.prismaObject("Tag", {
  fields: (t) => ({
    id: t.exposeID("id"),
    label: t.exposeString("label"),
  }),
});
