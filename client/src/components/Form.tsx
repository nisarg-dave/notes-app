import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";

interface IFormProps {
  onSubmit: (data: NoteData) => void;
}

function Form({ onSubmit }: IFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      body: textAreaRef.current!.value,
      tags: [],
    });
  };

  return (
    <form className="bg-white px-8 py-8" onSubmit={handleSubmit}>
      <div className="flex">
        <div className="mb-4 w-full mr-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            className="border rounded w-full pb-2 pt-1 px-3 text-gray-700"
            id="username"
            type="text"
            ref={titleRef}
            placeholder="Username"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <CreatableReactSelect
            value={selectedTags.map((tag) => {
              // CreateReactSelect expects the return to be like this in this format
              return { label: tag.label, value: tag.id };
            })}
            // Changing back to type of tag we expect
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Body
        </label>
        <textarea ref={textAreaRef} className="w-full border p-3" rows={10} />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          type="submit"
        >
          Save
        </button>
        <Link to="..">
          <button
            className="bg-gray-100 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            type="button"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

export default Form;
