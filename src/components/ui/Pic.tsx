import Image from "next/image";
import type { Img } from "@/content/images";

type Props = {
  img: Img;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  alt?: string;
  quality?: 60 | 75 | 85;
};

/** Изображение, заполняющее родителя (родителю нужен размер / aspect-ratio). */
export function Pic({ img, sizes = "100vw", priority, className = "", imgClassName = "", alt, quality = 75 }: Props) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      <Image
        src={img.src}
        alt={alt ?? img.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
