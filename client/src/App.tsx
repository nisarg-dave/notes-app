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
  const addTag = (tag: Tag) => {
    setTags(() => [...tags, tag]);
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
          <Route path="edit" element={<EditNote notes={notes} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
