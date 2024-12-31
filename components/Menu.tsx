"use client";

import { usePreferences } from "@/contexts/PreferencesContext";
import { useState, useRef } from "react";
import { GridWidth } from "@/types";
import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";

const GRID_WIDTH_OPTIONS: readonly GridWidth[] = [8, 5, 4, 3, 2];
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/chords", label: "Chords" },
];

const getLayoutLabel = (width: GridWidth) =>
  width === 8 ? "Sequential" : `${width} Finger`;

type DropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
  selectedWidth: GridWidth;
  onWidthSelect: (width: GridWidth) => void;
};

const LayoutDropdown = ({
  isOpen,
  onToggle,
  selectedWidth,
  onWidthSelect,
}: DropdownProps) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="px-4 py-2 text-sm bg-zinc-800 text-zinc-100 rounded-md hover:bg-zinc-700
                transition-colors duration-200 flex items-center gap-2"
    >
      <span>Overlap Layout: {getLayoutLabel(selectedWidth)}</span>
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
            onClick={() => onWidthSelect(width)}
            className={`w-full text-left px-4 py-2 text-sm ${
              selectedWidth === width
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
);

const Navigation = () => (
  <nav className="flex space-x-4">
    {NAV_LINKS.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="px-4 py-2 rounded-md hover:bg-zinc-800"
      >
        {label}
      </Link>
    ))}
  </nav>
);

export function Menu() {
  const { preferences, updatePreferences } = usePreferences();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false),
  );

  const handleWidthSelect = (width: GridWidth) => {
    updatePreferences({ gridWidth: width });
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 bg-zinc-900 text-zinc-100 font-mono">
      <Navigation />
      <div ref={menuRef}>
        <LayoutDropdown
          isOpen={isOpen}
          aria-expanded={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          selectedWidth={preferences.gridWidth}
          onWidthSelect={handleWidthSelect}
        />
      </div>
    </div>
  );
}
