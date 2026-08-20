"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { SHIMMER } from "@/components/ui/Loading";
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
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish before React attaches `onLoad`, and then the
  // event never arrives — so settle it from `complete` on mount as well.
  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-card",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          SHIMMER,
          "absolute inset-0 rounded-card transition-opacity duration-500",
          loaded && "opacity-0",
        )}
      />

      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={340}
        height={340}
        sizes="(max-width: 1100px) 320px, 272px"
        priority
        onLoad={() => setLoaded(true)}
        className={cn(
          "relative size-full rounded-card object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
