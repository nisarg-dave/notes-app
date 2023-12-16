import { NoteData, Tag } from "../types";
import Form from "./Form";

interface INewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
}

function NewNote({ onSubmit, onAddTag }: INewNoteProps) {
  return (
    <>
      <h1 className="text-3xl ml-8">New Note</h1>
      <Form onSubmit={onSubmit} onAddTag={onAddTag} />
    </>
  );
}

export default NewNote;
