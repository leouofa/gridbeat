interface ContentCardProps {
  title: string;
  emoji?: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

export default function ContentCard({
  title,
  emoji,
  headingLevel = "h2",
  children,
}: ContentCardProps) {
  const Heading = headingLevel;

  return (
    <div className="bg-gray-50 text-gray-800 px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20 mb-28 rounded drop-shadow-md">
      <Heading className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-6 sm:mb-8 md:mb-10">
        {title} {emoji}
      </Heading>
      {children}
    </div>
  );
}
