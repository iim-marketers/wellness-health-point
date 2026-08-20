"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children, useState, type UIEvent } from "react";

import {
  REVEAL_STAGGER,
  REVEAL_VIEWPORT,
  revealItemVariants,
} from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SwipeRowProps {
  children: React.ReactNode;
  /** Names the scroll region for screen readers, e.g. "Our doctors". */
  label: string;
  /** Layout from `md` up, where the row stops sliding and becomes a grid. */
  gridClassName?: string;
  /** Slide width below `md` — the leftover sliver is the next card peeking. */
  slideClassName?: string;

  subgrid?: boolean;
}

export default function SwipeRow({
  children,
  label,
  gridClassName = "md:grid-cols-2 xl:grid-cols-4",
  slideClassName = "w-[78%] sm:w-[46%]",
  subgrid = false,
}: SwipeRowProps) {
  const reduceMotion = useReducedMotion();
  const slides = Children.toArray(children);
  const [progress, setProgress] = useState(0);

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget;
    const travel = scrollWidth - clientWidth;
    setProgress(
      travel > 0 ? Math.round((scrollLeft / travel) * 1000) / 1000 : 0,
    );
  }

  const active = Math.round(progress * (slides.length - 1));

  return (
    <>
      <div
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={handleScroll}
        className={cn(
          "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain",
          "max-md:bleed-page max-md:-my-5 max-md:py-5",
          "md:grid md:gap-6 md:overflow-visible",
          gridClassName,
        )}
      >
        {slides.map((slide, index) =>
          subgrid ? (
            <div
              key={index}
              className={cn(
                "shrink-0 snap-start max-md:*:h-full",
                slideClassName,
                "md:contents",
              )}
            >
              {slide}
            </div>
          ) : (
            <motion.div
              key={index}
              data-reveal
              className={cn(
                "shrink-0 snap-start *:h-full",
                slideClassName,
                "md:w-auto",
              )}
              {...(reduceMotion
                ? {}
                : {
                    variants: revealItemVariants,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: REVEAL_VIEWPORT,
                    transition: {
                      delay: Math.min(index, 3) * REVEAL_STAGGER,
                    },
                  })}
            >
              {slide}
            </motion.div>
          ),
        )}
      </div>

      {slides.length > 1 ? (
        <SwipeRail count={slides.length} active={active} progress={progress} />
      ) : null}
    </>
  );
}

/**
 * Position readout for the row above: card count, then a rail whose thumb is
 * one card wide and travels the full track. The swipe hint retires itself as
 * soon as the row has moved.
 */
function SwipeRail({
  count,
  active,
  progress,
}: {
  count: number;
  active: number;
  progress: number;
}) {
  const started = progress > 0.01;

  return (
    <div
      aria-hidden="true"
      className="mt-6 flex items-center justify-center gap-3.5 md:hidden"
    >
      <span className="relative h-0.75 w-24 overflow-hidden rounded-full bg-line">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-linear-[90deg,var(--color-primary),var(--color-pink)] transition-transform duration-200 ease-out"
          style={{
            width: `${100 / count}%`,
            transform: `translateX(${progress * (count - 1) * 100}%)`,
          }}
        />
      </span>

      {/* <span
        className={cn(
          "flex items-center gap-1.5 text-[0.72rem] font-bold tracking-[1px] text-primary/70 uppercase transition-opacity duration-300",
          started && "opacity-0",
        )}
      >
        Swipe
        <i className="fa-solid fa-arrow-right-long" />
      </span> */}
    </div>
  );
}
