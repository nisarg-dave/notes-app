import type { GetNotesQuery } from "./graphql/generated";
// The reason you import this type instead of the full Note and Tag types is that the GetNotesQuery type has access to a more specific set of types that contain only the fields your query retrieves
// Accessing first index as that's where the type definitions are

export type Tag = GetNotesQuery["notes"][0]["tags"][0];

export type Note = GetNotesQuery["notes"][0];

export type NoteData = Omit<Note, "id">;
