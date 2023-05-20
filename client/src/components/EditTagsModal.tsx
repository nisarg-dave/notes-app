import { useState } from "react";
import { Tag } from "../types";

interface IEditTagsModalProps {
  availableTags: Tag[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
  showModal: () => void;
}

function EditTagsModal({
  availableTags,
  updateTag,
  deleteTag,
  showModal,
}: IEditTagsModalProps) {
  const [newLabel, setNewLabel] = useState<string>();
  return (
    <div className="flex min-h-full items-center justify-center p-4 text-center">
      <div className="bg-white px-4 pb-4 pt-5 w-96">
        <h1 className="text-xl font-bold mb-5">Edit Tags</h1>
        {availableTags.map((tag: Tag) => (
          <div className="w-full flex justify-between my-2" key={tag.id}>
            <input
              className="w-full p-2"
              value={tag.label}
              onChange={(e) => updateTag(tag.id, e.target.value)}
            ></input>
            <button
              className="bg-red-300 p-2 ml-2 rounded-full"
              onClick={() => deleteTag(tag.id)}
            >
              X
            </button>
          </div>
        ))}
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded"
            onClick={showModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTagsModal;
