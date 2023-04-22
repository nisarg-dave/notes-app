import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";
import { useMemo, useState } from "react";
import { NoteData, RawNote, Tag } from "./types";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState<RawNote[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const createNote = ({ tags, ...data }: NoteData) => {
    setNotes(() => {
      return [
        ...notes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };
  const addTag = (tag: Tag) => {
    setTags(() => [...tags, tag]);
  };
  return (
    <div className="m-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} />}
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
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
