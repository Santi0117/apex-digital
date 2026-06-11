type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  hint?: string;
};

export default function SectionHeader({
  label,
  title,
  description,
  hint,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
          {description}
        </p>
      )}
      {hint && (
        <p className="text-sm text-accent/70 dark:text-accent-muted/80 mt-4">{hint}</p>
      )}
    </div>
  );
}
