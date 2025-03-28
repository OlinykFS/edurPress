"use client";

import { useState, useRef, useEffect } from "react";

export interface AccordionProps {
  title?: string;
  header?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function Accordion({ title, header, isOpen, onToggle, children }: AccordionProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen, children]);

  return (
    <div className="shadow-sm mb-4 border rounded-lg overflow-hidden">
      <div onClick={onToggle} className="cursor-pointer">
        {header ? (
          header
        ) : (
          <div className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 px-6 h-14 transition">
            <span className="font-semibold text-gray-800">{title}</span>
            <div className="relative w-6 h-6">
              <span
                className={`absolute inset-0 flex text-2xl items-center justify-center transition-all duration-300 transform ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              >
                +
              </span>
              <span
                className={`absolute inset-0 flex text-2xl items-center justify-center transition-all duration-300 transform ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                }`}
              >
                −
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        ref={contentRef}
        className="transition-all duration-300 overflow-hidden ease-in-out"
        style={{ maxHeight }}
      >
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
