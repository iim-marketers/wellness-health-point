"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface PolicySectionView {
  id: string;
  title: string;
  content: React.ReactNode;
}

/**
 * How far below the top of the viewport a section's heading has to pass before
 * it counts as the one being read. Clears the sticky navbar, and sits below
 * `scroll-mt-28` so a section jumped to from the contents list lights up.
 */
const ACTIVE_OFFSET = 140;

/**
 * A long policy document: numbered contents down the left, sections on the
 * right, with the contents entry for the section in view highlighted. The
 * contents list is desktop-only — on a phone there is no room beside the text.
 */
export default function PolicyLayout({
  label,
  sections,
}: {
  /** Accessible name for the contents navigation. */
  label: string;
  sections: PolicySectionView[];
}) {
  const [activeId, setActiveId] = useState<string | undefined>(
    sections[0]?.id,
  );
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    let frame = 0;

    function update() {
      frame = 0;

      // Short sections at the end can never scroll up to the offset line, so
      // hitting the bottom of the page hands the highlight to the last one.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveId(elements.at(-1)?.id);
        return;
      }

      let current = elements[0]?.id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top > ACTIVE_OFFSET) break;
        current = element.id;
      }
      setActiveId(current);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  // The contents list scrolls on short screens; keep the highlighted entry in
  // view. Set `scrollTop` directly — `scrollIntoView` would move the page too.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !link || list.scrollHeight <= list.clientHeight) return;

    const top = link.offsetTop - list.offsetTop;
    if (top < list.scrollTop) {
      list.scrollTop = top;
    } else if (top + link.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = top + link.offsetHeight - list.clientHeight;
    }
  }, [activeId]);

  return (
    <div className="grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)]">
      <nav
        aria-label={label}
        className="max-lg:hidden lg:sticky lg:top-28 lg:self-start"
      >
        <p className="mb-3 px-3 text-[0.8rem] font-bold tracking-[1px] text-pink uppercase">
          On this page
        </p>
        {/* Still scrolls on short screens, but with the scrollbar hidden — the
            effect above keeps the highlighted entry in view instead. */}
        <ol
          ref={listRef}
          className="relative grid max-h-[calc(100vh-10rem)] gap-1 overflow-y-auto border-l-2 border-line scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "-ml-0.5 flex gap-2 border-l-2 px-3 py-1.75 text-[0.92rem] leading-snug transition-colors",
                    active
                      ? "border-primary bg-mist font-semibold text-primary"
                      : "border-transparent text-body hover:border-primary/40 hover:text-ink",
                  )}
                >
                  <span className="w-6 shrink-0 tabular-nums">
                    {index + 1}.
                  </span>
                  <span>{section.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid gap-8 md:gap-10">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-28"
          >
            <h2
              id={`${section.id}-heading`}
              className="mb-3 font-display text-[1.2rem] font-semibold text-ink md:text-[1.35rem]"
            >
              {index + 1}. {section.title}
            </h2>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  );
}
