import React from "react";
import { Tag } from "../types";
import { Link } from "react-router-dom";

interface INoteCardProps {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
}

function NoteCard({ id, title, body, tags }: INoteCardProps) {
  return (
    <Link to={`/${id}/edit`}>
      <div className="bg-yellow-300 w-full h-40 sm:h-48 md:h-56 mx-auto p-4 cursor-pointer hover:bg-yellow-600 flex flex-col justify-between">
        <div>
          <h1 className="text-center text-2xl">{title}</h1>
          <p>{body}</p>
        </div>
        <div className="flex">
          {tags.map((tag) => {
            return (
              <div className="bg-blue-300 rounded-md px-3 mx-1">
                <p className="text-sm text-center">{tag.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
