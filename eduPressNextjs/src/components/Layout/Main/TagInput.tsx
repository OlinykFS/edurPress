"use client"
import { useState } from "react";
interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
        setInputValue("");
      }
    }
  };

  const handleRemove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="border-gray-300 bg-gray-50 p-2 border rounded-lg focus-within:ring-2 focus-within:ring-orange-500 transition-all">
      <div className="flex flex-wrap gap-2">
       
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-gray-800 outline-none"
        />
         {value.map((tag, index) => (
          <span
            key={index}
            className="flex items-center bg-orange-200 px-3 py-1 rounded-full text-orange-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemove(tag)}
              className="ml-1 text-orange-500 hover:text-orange-700"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}