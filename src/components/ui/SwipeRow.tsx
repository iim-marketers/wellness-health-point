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
  /**
   * Takes the slide wrapper out of the layout at `md` up (`display: contents`),
   * for children that must stay direct grid items — the doctor cards, which are
   * subgrids of the row. Costs those cards their per-card reveal, so the caller
   * wraps the whole row in a `Reveal` instead.
   */
  subgrid?: boolean;
}

/**
 * A card row that is a swipeable slider on phones and the normal grid from
 * `md` up.
 *
 * Mobile pages were running many screens long because every list stacked one
 * card per row; sliding them sideways keeps a section to roughly one card's
 * height. The row is full-bleed so the next card is visibly cut by the screen
 * edge, and the rail underneath — a thumb sized to one card of `n`, sliding as
 * you scroll — stands in for the hidden scrollbar.
 */
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
    // Rounded so a fling doesn't re-render on every sub-pixel of scroll.
    setProgress(
      travel > 0 ? Math.round((scrollLeft / travel) * 1000) / 1000 : 0,
    );
  }

  /** Whichever card is closest to filling the view. */
  const active = Math.round(progress * (slides.length - 1));

  return (
    <>
      <div
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={handleScroll}
        className={cn(
          // The `max-md:` bits are the slider proper, so nothing has to be
          // unset at `md` up. `-my-5 py-5` buys room for the cards' drop
          // shadow and hover lift, which `overflow-x` clips on both axes.
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
                    // Capped: a slide swiped into view later shouldn't sit
                    // blank for half a second waiting on its turn.
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
      {/* <span className="font-display text-[0.8rem] font-semibold tabular-nums text-ink">
        {String(active + 1).padStart(2, "0")}
        <span className="text-body/60"> / {String(count).padStart(2, "0")}</span>
      </span> */}

      <span className="relative h-0.75 w-24 overflow-hidden rounded-full bg-line">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-linear-[90deg,var(--color-primary),var(--color-pink)] transition-transform duration-200 ease-out"
          style={{
            width: `${100 / count}%`,
            transform: `translateX(${progress * (count - 1) * 100}%)`,
          }}
        />
      </span>

      <span
        className={cn(
          "flex items-center gap-1.5 text-[0.72rem] font-bold tracking-[1px] text-primary/70 uppercase transition-opacity duration-300",
          started && "opacity-0",
        )}
      >
        Swipe
        <i className="fa-solid fa-arrow-right-long" />
      </span>
    </div>
  );
}
