import type { Diagnostic } from "@/lib/types";

/**
 * A single test in the diagnostics grid.
 *
 * Deliberately laid out side-on — icon tile, then text — so the block reads as
 * a list of tests rather than a second set of departments, which the centred
 * `ServiceCard` above it already covers.
 */
export default function DiagnosticCard({
  diagnostic,
}: {
  diagnostic: Diagnostic;
}) {
  return (
    <article className="group flex h-full gap-4 rounded-card border border-line bg-white p-5 shadow-card  sm:gap-5 sm:p-6">
      <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-mist text-[1.35rem] text-primary ">
        <i className={diagnostic.icon} aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-[1.15rem] leading-snug font-semibold text-ink">
          {diagnostic.title}
        </h3>
        <p className="text-[0.78rem] font-bold tracking-[0.5px] text-pink uppercase">
          {diagnostic.subtitle}
        </p>
        <p className="mt-2.5 text-[0.95rem]">{diagnostic.description}</p>

        {diagnostic.atHome ? (
          <p className="mt-3 flex items-center gap-1 text-[0.85rem] text-muted-foreground">
            <i
              className="fa-solid fa-house-medical text-primary mb-1"
              aria-hidden="true"
            />
            {diagnostic.atHomeNote}
          </p>
        ) : null}
      </div>
    </article>
  );
}
