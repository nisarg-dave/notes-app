export type Tag = {
  id: string;
  label: string;
};

export type NoteData = {
  title: string;
  body: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & NoteData;

export type RawNoteData = {
  title: string;
  body: string;
  tagIds: string[];
};

export type RawNote = {
  id: string;
} & RawNoteData;
