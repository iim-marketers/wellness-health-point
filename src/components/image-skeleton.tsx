"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

import { SHIMMER } from "@/components/ui/Loading";
import { cn } from "@/lib/utils";

interface ImageSkeletonProps extends ImageProps {
  wrapperClassName?: string;
}

export default function ImageSkeleton({
  alt,
  className,
  wrapperClassName,
  onLoad,
  onError,
  ...props
}: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setLoaded(true);
  }, []);

  return (
    <span className={cn("relative block", wrapperClassName)}>
      <span
        aria-hidden="true"
        className={cn(
          SHIMMER,
          "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500",
          loaded && "opacity-0",
        )}
      />

      <Image
        ref={imageRef}
        alt={alt}
        {...props}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        // A broken image shouldn't sit under a shimmer that pulses forever.
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
        className={cn(
          "relative transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </span>
  );
}
