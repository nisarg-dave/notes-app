import { FormEvent, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";
import { useQuery } from "@apollo/client";
import { GetTagsQueryDocument } from "../graphql/generated";

interface IFormProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
}

function Form({ onSubmit, onAddTag }: IFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GetTagsQueryDocument);

  useMemo(() => {
    console.log(data?.tags);
    setAvailableTags(data?.tags!);
  }, [data]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // Replacing ids from  "" to the actual id
    const newSelectedTags = selectedTags.map((selectedTag) => {
      if (selectedTag.id === "") {
        const foundTag = availableTags.find((availableTag) => {
          if (availableTag.label === selectedTag.label) {
            return availableTag;
          }
        })!;
        selectedTag.id = foundTag.id;
        return selectedTag;
      }
      return selectedTag;
    });
    console.log(newSelectedTags);
    setSelectedTags(newSelectedTags);
    onSubmit({
      title: titleRef.current!.value,
      body: textAreaRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
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
            id="title"
            type="text"
            ref={titleRef}
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
            onCreateOption={(label) => {
              let newTag = { id: "", label };
              onAddTag(newTag);
              setTimeout(() => {
                refetch();
              }, 2000);
              setSelectedTags(() => [...selectedTags, newTag]);
            }}
            value={selectedTags.map((tag) => {
              // CreateReactSelect expects the return to be like this in this format
              console.log("Values", tag);
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
