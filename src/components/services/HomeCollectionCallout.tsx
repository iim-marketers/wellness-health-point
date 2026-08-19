import { ButtonLink } from "@/components/ui/button";
import { site, telHref } from "@/lib/site";

/**
 * Standing note under the diagnostics grid: a patient who cannot come in can
 * have the sample collected at home. Kept as its own band, not a card, so it
 * doesn't read as one more test in the list.
 */
export default function HomeCollectionCallout() {
  return (
    <div className="mt-7 flex flex-col items-center gap-5 rounded-card border border-primary/15 bg-linear-[135deg,#eef7ff,#f5faff] p-6 text-center md:mt-8 lg:flex-row lg:gap-7 lg:p-8 lg:text-left">
      <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white text-[1.6rem] text-primary shadow-card">
        <i className="fa-solid fa-truck-medical" aria-hidden="true" />
      </span>

      <div className="lg:flex-1">
        <h3 className="font-display text-[1.25rem] font-semibold text-ink md:text-[1.4rem]">
          Home Collection Available
        </h3>
        <p className="mt-1.5">
          Can&apos;t come to the centre? Our technician visits your home to
          collect the sample or run the test, and the report reaches you just
          the same. Call{" "}
          <span className="font-semibold whitespace-nowrap text-ink">
            {site.phonePrimary}
          </span>{" "}
          to book a visit.
        </p>
      </div>

      <ButtonLink href={telHref} block={false} className="shrink-0">
        <i className="fa-solid fa-phone" aria-hidden="true" />
        Call to Book
      </ButtonLink>
    </div>
  );
}
