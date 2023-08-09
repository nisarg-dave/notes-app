import { builder } from "./builder";
import "./models/Note";
import "./models/Tag";

export const schema = builder.toSchema({});

// This file will simply import the models, causing the code within the files to be run, and run the builder instance's toSchema function to generate the GraphQL schema
