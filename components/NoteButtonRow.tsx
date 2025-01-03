import { NOTES } from "@/constants";
import { NoteButton } from "./NoteButton";

interface NoteButtonRowProps {
  variant?: "default" | "alias" | "natural";
  onPlay: (noteName: string) => void;
  className?: string;
}

export const NoteButtonRow: React.FC<NoteButtonRowProps> = ({
  variant = "default",
  onPlay,
  className = "",
}) => {
  return (
    <div className={`flex gap-2 mt-8 ${className}`.trim()}>
      {NOTES.map((note) => (
        <NoteButton
          key={variant === "alias" ? note.alias : note.name}
          note={note}
          variant={variant}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
};
