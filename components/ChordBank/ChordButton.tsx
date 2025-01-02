import React from "react";

interface ChordButtonProps {
  name: string;
  onClick: () => void;
  isActive: boolean;
}

const ChordButton: React.FC<ChordButtonProps> = ({
  name,
  onClick,
  isActive,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded transition-colors ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
      }`}
    >
      {name}
    </button>
  );
};

export default ChordButton;
