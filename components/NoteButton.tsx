import { Note } from "@/types";

interface NoteButtonProps {
  note: Note;
  variant?: "default" | "alias" | "natural";
  onPlay: (noteName: string) => void;
}

export const NoteButton: React.FC<NoteButtonProps> = ({
  note,
  variant = "default",
  onPlay,
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case "alias":
        return "border-gray-800 dark:border-gray-200";
      case "natural":
        return `${!note.natural ? "bg-black text-white" : "bg-white dark:text-gray-800"}`;
      default:
        return "";
    }
  };

  return (
    <div
      className={`
        w-10 h-10 flex items-center justify-center rounded border-2
        cursor-pointer hover:saturate-[2.5] active:saturate-[3.0] select-none
        ${getButtonStyles()}
      `}
      style={
        variant === "default"
          ? {
              backgroundColor: note.color,
              color: note.textColor,
            }
          : {}
      }
      onClick={() => onPlay(note.name)}
    >
      {variant === "alias" ? note.alias : note.name}
    </div>
  );
};
