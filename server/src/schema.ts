import { builder } from "./builder";
import "./schema/Note";
import "./schema/Tag";

export const schema = builder.toSchema({});

// This file will simply import the models, causing the code within the files to be run, and run the builder instance's toSchema function to generate the GraphQL schema
