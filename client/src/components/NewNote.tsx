import { NoteData } from "../types";
import Form from "./Form";

interface INewNoteProps {
  onSubmit: (data: NoteData) => void;
}

function NewNote({ onSubmit }: INewNoteProps) {
  return (
    <>
      <h1 className="text-3xl">New Note</h1>
      <Form onSubmit={onSubmit} />
    </>
  );
}

export default NewNote;
