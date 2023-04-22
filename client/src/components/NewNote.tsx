import { NoteData, Tag } from "../types";
import Form from "./Form";

interface INewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

function NewNote({ onSubmit, onAddTag, availableTags }: INewNoteProps) {
  return (
    <>
      <h1 className="text-3xl ml-8">New Note</h1>
      <Form
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default NewNote;
