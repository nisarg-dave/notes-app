import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";
import { useState } from "react";
import { NoteData, Note, Tag } from "./types";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";
import EditNote from "./components/EditNote";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const createNote = ({ title, body, tags }: NoteData): void => {
    setNotes(() => [...notes, { id: uuidV4(), title, body, tags }]);
  };
  const addTag = (tag: Tag): void => {
    setTags(() => [...tags, tag]);
  };

  const updateNote = ({ id, title, body, tags }: Note): void => {
    const restOfNotes = notes.filter((note) => note.id !== id);
    setNotes(() => [...restOfNotes, { id, title, body, tags }]);
  };

  const deleteNote = (id: string): void => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  return (
    <div className="m-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notes} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={createNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route
            path="edit"
            element={
              <EditNote
                notes={notes}
                onSubmit={updateNote}
                onDelete={deleteNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
