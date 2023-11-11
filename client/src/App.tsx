import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";
import { useState, useEffect, useMemo } from "react";
import { NoteData, Note, Tag } from "./types";
import NoteList from "./components/NoteList";
import EditNote from "./components/EditNote";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  GetNotesDocument,
  CreateNoteMutationDocument,
} from "./graphql/generated";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  let notesArr: Note[];
  let tagsArr: Tag[] = [];

  const { loading, error, data } = useQuery(GetNotesDocument);
  const [createNoteMutation] = useMutation(CreateNoteMutationDocument, {
    refetchQueries: [GetNotesDocument],
  });

  useMemo(() => {
    notesArr = data?.notes.map((note) => note)!;
    notesArr?.forEach((note) => {
      note.tags.map((tag) => tagsArr.push(tag));
    })!;
    setNotes(notesArr!);
    setTags(tagsArr!);
  }, [data]);

  const createNote = ({ title, body, tags }: NoteData): void => {
    // setNotes(() => [...notes, { id: uuidV4(), title, body, tags }]);

    createNoteMutation({ variables: { note: { title, body, tags } } });
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

  const updateTag = (id: string, label: string): void => {
    // Find the index
    const indexOfTag = tags.findIndex((tag) => tag.id === id);
    // Create a new array of the tags so that we don't mutate state directly
    const allTags = [...tags];
    // Replace the tag
    allTags[indexOfTag] = { id, label };
    setTags(allTags);
    // Need to update the same tag in the notes
    notes.forEach((note) => {
      const indexOfTagInNote = note.tags.findIndex((tag) => tag.id === id);
      const tagsInNote = [...note.tags];
      tagsInNote[indexOfTagInNote] = { id, label };
      note.tags = tagsInNote;
    });
  };

  const deleteTag = (id: string): void => {
    setTags(tags.filter((tag) => tag.id !== id));
    // Need to delete tag in notes
    notes.forEach((note) => {
      note.tags = note.tags.filter((tag) => tag.id !== id);
    });
  };
  return (
    <div className="m-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notes}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          }
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
