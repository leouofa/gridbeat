"use client";

import { usePreferences } from "@/contexts/PreferencesContext";
import { useState, useRef, useEffect } from "react";
import { GridWidth } from "@/types";

const GRID_WIDTH_OPTIONS: readonly GridWidth[] = [8, 5, 4, 3, 2];

const getLayoutLabel = (width: GridWidth) =>
  width === 8 ? "Sequential" : `${width} Finger`;

export function Menu() {
  const { preferences, updatePreferences } = usePreferences();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleWidthSelect = (width: GridWidth) => {
    updatePreferences({ gridWidth: width });
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50" ref={menuRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 text-sm bg-zinc-800 text-zinc-100 rounded-md hover:bg-zinc-700
                     transition-colors duration-200 flex items-center gap-2"
        >
          <span>Overlap Layout: {getLayoutLabel(preferences.gridWidth)}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-zinc-800 rounded-md shadow-lg">
            {GRID_WIDTH_OPTIONS.map((width) => (
              <button
                key={width}
                onClick={() => handleWidthSelect(width)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  preferences.gridWidth === width
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                } transition-colors duration-200`}
              >
                {getLayoutLabel(width)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
