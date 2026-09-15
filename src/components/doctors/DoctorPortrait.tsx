import ImageSkeleton from "@/components/image-skeleton";
import { cn } from "@/lib/utils";

interface DoctorPortraitProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * The doctor's photo with a shimmer standing in until it has actually decoded.
 *
 * These are large poster-style portraits, so on a phone connection there was a
 * visible empty box while one downloaded. The placeholder holds the exact
 * square the image will occupy, so nothing below it moves when it swaps in.
 */
export default function DoctorPortrait({
  src,
  alt,
  className,
}: DoctorPortraitProps) {
  return (
    <ImageSkeleton
      src={src}
      alt={alt}
      width={340}
      height={340}
      sizes="(max-width: 1100px) 320px, 272px"
      priority
      wrapperClassName={cn(
        "aspect-square w-full overflow-hidden rounded-card",
        className,
      )}
      className="size-full rounded-card object-cover"
    />
  );
}
