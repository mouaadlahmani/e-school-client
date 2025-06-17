import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const BASE_URL = "http://localhost:1337"

const BlogCard = ({ article, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img
        src={`${BASE_URL}${article.thumbnail}` || "/default-thumb.jpg"}
        alt={article.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
      <p className="text-sm text-gray-600">{article.description}</p>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={() => onEdit(article)} className="text-blue-600">
          <FiEdit2 />
        </button>
        <button onClick={() => onDelete(article)} className="text-red-600">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
