import Image from "next/image";

type LogoMarkProps = {
  className?: string;
  /** light = ojo claro (fondos oscuros) · accent = ojo cyan (fondos claros) */
  variant?: "light" | "accent";
  showName?: boolean;
  nameClassName?: string;
};

/**
 * Marca Onvision — el mismo ojo de onvisiondigital.com.
 */
export default function LogoMark({
  className = "h-8",
  variant = "accent",
  showName = false,
  nameClassName = "text-base font-medium tracking-wide text-ov-ink",
}: LogoMarkProps) {
  const src = variant === "light" ? "/logo-eye.png" : "/logo-eye-accent.png";

  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={src}
        alt=""
        width={532}
        height={282}
        className={`${className} w-auto shrink-0 object-contain`}
        aria-hidden
        priority
      />
      {showName && <span className={nameClassName}>onvision</span>}
    </span>
  );
}
