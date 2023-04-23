import { Note } from "../types";
import { Link, useParams } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";

interface IEditNoteProps {
  notes: Note[];
}

function EditNote({ notes }: IEditNoteProps) {
  const { id } = useParams();

  const currentNote = notes.find((note) => note.id === id);

  return (
    <div className="mx-8">
      <h1 className="text-3xl">Edit Note</h1>
      <form className="bg-white py-8">
        <div className="flex">
          <div className="mb-4 w-full mr-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="border rounded w-full pb-2 pt-1 px-3 text-gray-700"
              id="title"
              type="text"
              value={currentNote?.title}
              placeholder="Title"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tags
            </label>
            <CreatableReactSelect
              // If provided, this will be called with the input value when a new option is created, and onChange will not be called.
              // Label is what we type
              // onCreateOption={(label) => {
              //   const newTag = { id: uuidV4(), label };
              //   onAddTag(newTag);
              //   setSelectedTags(() => [...selectedTags, newTag]);
              // }}
              value={currentNote?.tags.map((tag) => {
                // CreateReactSelect expects the return to be like this in this format
                return { label: tag.label, value: tag.id };
              })}
              // Provide the options
              options={currentNote?.tags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              // Changing back to type of tag we expect. It takes in the tags and returns in our format.
              // onChange={(tags) =>
              //   setSelectedTags(
              //     tags.map((tag) => {
              //       return { label: tag.label, id: tag.value };
              //     })
              //   )
              // }
              isMulti
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Body
          </label>
          <textarea
            value={currentNote?.body}
            className="w-full border p-3"
            rows={10}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            type="submit"
          >
            Save
          </button>
          <Link to="/">
            <button
              className="bg-gray-100 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              type="button"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
