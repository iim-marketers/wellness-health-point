import Reveal from "@/components/ui/Reveal";
import type { Diagnostic } from "@/lib/types";

/**
 * Condensed view of the diagnostics list for the landing page — names only,
 * with the home-service ones marked. The full explanations live on
 * `/services#diagnostics`.
 */
export default function DiagnosticStrip({
  diagnostics,
}: {
  diagnostics: Diagnostic[];
}) {
  return (
    <Reveal className="mt-10 md:mt-12">
      <div className="rounded-card border border-line bg-white p-6 shadow-card">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-[0.78rem] font-bold tracking-[1.5px] text-pink uppercase">
            Diagnostic Centre
          </span>
          <h3 className="font-display text-[1.3rem] font-semibold text-ink md:text-[1.5rem]">
            Tests Under The Same Roof
          </h3>
        </div>

        <ul className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
          {diagnostics.map((diagnostic) => (
            <li
              key={diagnostic.id}
              className="flex items-center gap-2.5 rounded-full border border-line bg-mist py-2.5 pr-3.5 pl-4 text-[0.9rem] font-semibold text-ink"
            >
              <i
                className={`text-primary ${diagnostic.icon}`}
                aria-hidden="true"
              />
              {diagnostic.title}
              {/* {diagnostic.atHome ? (
                <span className="rounded-full bg-pink/10 px-2.5 py-0.5 text-[0.72rem] font-bold tracking-[0.3px] text-pink uppercase">
                  Home
                </span>
              ) : null} */}
            </li>
          ))}
        </ul>

        <p className="-mx-6 px-6 mt-5 flex items-center justify-center gap-2.5 border-t border-line pt-5 text-center text-[0.95rem] md:justify-start md:text-left">
          <i
            className="fa-solid fa-house-medical text-primary"
            aria-hidden="true"
          />
          <span>
            <strong className="font-semibold text-ink">
              Home collection available
            </strong>{" "}
            — our technician can visit you instead.
          </span>
        </p>
      </div>
    </Reveal>
  );
}
