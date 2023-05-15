import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../types";
import NoteCard from "./NoteCard";

interface INoteListProps {
  availableTags: Tag[];
  notes: Note[];
}

function NoteList({ availableTags, notes }: INoteListProps) {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          // Array.every makes sure that every element passes the test
          selectedTags.every((tag) =>
            // Array.some tests whether at least one element passes the test
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <div className="mx-8">
      <div className="flex justify-between">
        <h1 className="text-3xl">Notes</h1>
        <div>
          <Link to="/new">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              type="submit"
            >
              Create
            </button>
          </Link>
        </div>
      </div>
      <div className="flex  py-8">
        <div className="mb-4 w-full mr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            className="border rounded w-full pb-2 pt-1 px-3 text-gray-700"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <ReactSelect
            value={selectedTags.map((tag) => {
              // CreateReactSelect expects the return to be like this in this format
              return { label: tag.label, value: tag.id };
            })}
            // Provide the options
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            // Changing back to type of tag we expect. It takes in the tags and returns in our format.
            onChange={(tags) =>
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              )
            }
            isMulti
          />
        </div>
      </div>
      <div className="grid grid-cols-1 p-6 sm:grid-cols-2 sm:p-6 md:grid-cols-3 md:p-4 gap-4">
        {filteredNotes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              tags={note.tags}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NoteList;
