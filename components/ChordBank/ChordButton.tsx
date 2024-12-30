import React from "react";

interface ChordButtonProps {
  name: string;
  onClick: () => void;
}

const ChordButton: React.FC<ChordButtonProps> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {name}
    </button>
  );
};

export default ChordButton;
