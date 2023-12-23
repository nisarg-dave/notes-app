import { Note, Tag } from "../types";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { FormEvent, useState } from "react";

interface IEditNoteProps {
  notes: Note[];
  onSubmit: (data: Note) => void;
  onDelete: (id: string) => void;
  availableTags: Tag[];
}

function EditNote({
  notes,
  onSubmit,
  onDelete,
  availableTags,
}: IEditNoteProps) {
  const paramObject = useParams();
  let id: string;
  id = paramObject.id!;
  // This may not persit and will need to change to state
  let currentNote: Note;
  currentNote = notes.find((note) => note.id === id)!;

  const [title, setTitle] = useState<string>(currentNote.title);
  const [body, setBody] = useState<string>(currentNote.body);
  const [tags, setTags] = useState<Tag[]>(currentNote.tags);

  const navigate = useNavigate();

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ id, title, body, tags });
    navigate("../..");
  };

  const handleDelete = () => {
    onDelete(id);
    navigate("../..");
  };

  return (
    <div className="mx-8">
      <h1 className="text-3xl">Edit Note</h1>
      <form className="bg-white py-8" onSubmit={handleSave}>
        <div className="flex">
          <div className="mb-4 w-full mr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="border rounded w-full pb-2 pt-1 px-3 text-gray-700"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tags
            </label>
            <ReactSelect
              value={tags.map((tag) => {
                // CreateReactSelect expects the return to be like this in this format
                return { label: tag.label, value: tag.id };
              })}
              // Provide the options
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              // Changing back to type of tag we expect. It takes in the tags and returns in our format.
              onChange={(tags) =>
                setTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                )
              }
              isMulti
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Body
          </label>
          <textarea
            value={body}
            className="w-full border p-3"
            rows={10}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              type="submit"
            >
              Save
            </button>
            <Link to="../..">
              <button
                className="bg-gray-100 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                type="button"
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
