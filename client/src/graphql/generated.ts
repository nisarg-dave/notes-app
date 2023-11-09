import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type EditNoteInput = {
  body: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type EditTagInput = {
  label: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createNote: Note;
  createTag: Tag;
  deleteNote: Array<Note>;
  deleteTag: Array<Tag>;
  editNote: Note;
  editTag: Tag;
};

export type MutationCreateNoteArgs = {
  note: NewNoteInput;
};

export type MutationCreateTagArgs = {
  tag: NewTagInput;
};

export type MutationDeleteNoteArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationDeleteTagArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationEditNoteArgs = {
  id: Scalars["Int"]["input"];
  note: EditNoteInput;
};

export type MutationEditTagArgs = {
  id: Scalars["Int"]["input"];
  tag: EditTagInput;
};

export type NewNoteInput = {
  body: Scalars["String"]["input"];
  tags?: InputMaybe<Array<NewTagInput>>;
  title: Scalars["String"]["input"];
};

export type NewTagInput = {
  label: Scalars["String"]["input"];
};

export type Note = {
  __typename?: "Note";
  body: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  tags: Array<Tag>;
  title: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  notes: Array<Note>;
  tags: Array<Tag>;
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"]["output"];
  label: Scalars["String"]["output"];
};

export type GetNotesQueryVariables = Exact<{ [key: string]: never }>;

export type GetNotesQuery = {
  __typename?: "Query";
  notes: Array<{
    __typename?: "Note";
    id: string;
    title: string;
    body: string;
    tags: Array<{ __typename?: "Tag"; id: string; label: string }>;
  }>;
};

export const GetNotesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetNotes" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "body" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tags" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetNotesQuery, GetNotesQueryVariables>;
