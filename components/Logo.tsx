import Image from "next/image";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ showText = true, size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { image: 32, text: "text-lg" },
    md: { image: 40, text: "text-xl" },
    lg: { image: 48, text: "text-2xl" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/LogoInnotalk.png"
        alt="InnoTalk"
        width={currentSize.image}
        height={currentSize.image}
        className="w-auto"
        style={{ height: `${currentSize.image}px` }}
      />
      {showText && (
        <span className={`font-playfair font-semibold tracking-tight text-white ${currentSize.text}`}>
          InnoTalk
        </span>
      )}
    </div>
  );
}
