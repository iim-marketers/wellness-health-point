import type { Diagnostic } from "@/lib/types";

export default function DiagnosticCard({
  diagnostic,
}: {
  diagnostic: Diagnostic;
}) {
  return (
    <article className="group grid h-full grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-3 rounded-card border border-line bg-white p-5 shadow-card sm:items-start sm:gap-x-5 sm:gap-y-0 sm:p-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-mist text-[1.2rem] text-primary sm:row-span-2 sm:size-13 sm:text-[1.35rem]">
        <i className={diagnostic.icon} aria-hidden="true" />
      </span>

      <h3 className="min-w-0 font-display text-[1.15rem] leading-snug font-semibold text-balance text-ink">
        {diagnostic.title}
      </h3>

      <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2">
        <p className="text-[0.78rem] font-bold tracking-[0.5px] text-pink uppercase">
          {diagnostic.subtitle}
        </p>
        <p className="mt-2 text-[0.95rem] text-pretty sm:mt-2.5">
          {diagnostic.description}
        </p>

        {diagnostic.atHome ? (
          <p className="mt-3 flex items-start gap-1.5 text-[0.85rem] text-muted-foreground">
            <i
              className="fa-solid fa-house-medical mt-0.75 text-primary"
              aria-hidden="true"
            />
            {diagnostic.atHomeNote}
          </p>
        ) : null}
      </div>
    </article>
  );
}
