import { site, telHref } from "@/lib/site";
import type { Availability, AvailabilitySlot } from "@/lib/types";

/** Monday-first, matching how the clinic reads its own week. */
const WEEK = [
  { name: "Monday", short: "Mon" },
  { name: "Tuesday", short: "Tue" },
  { name: "Wednesday", short: "Wed" },
  { name: "Thursday", short: "Thu" },
  { name: "Friday", short: "Fri" },
  { name: "Saturday", short: "Sat" },
  { name: "Sunday", short: "Sun" },
] as const;

const SESSION_ICON = {
  Morning: "fa-solid fa-sun",
  Evening: "fa-solid fa-moon",
} as const;

/**
 * A doctor's week at a glance.
 *
 * The seven-day strip is the whole point: a patient shouldn't have to parse a
 * sentence to find out whether Thursday is worth a phone call. Sittings tied
 * to a half of the day carry a sun or moon, and the sentence underneath repeats
 * the same thing in words for anyone who'd rather read it.
 */
export default function DoctorAvailability({
  availability,
  doctorName,
}: {
  availability: Availability;
  doctorName: string;
}) {
  const { slots, appointmentOnly, note } = availability;

  /* Only legend the halves of the day this doctor actually sits, so an
     evening-only week never advertises a morning session. */
  const sessionsUsed = (["Morning", "Evening"] as const).filter((session) =>
    slots.some((slot) => slot.session === session),
  );

  return (
    <div className="rounded-card border border-line bg-mist p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 className="font-display text-[1.2rem] font-semibold text-ink">
          Availability
        </h3>
        {appointmentOnly ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-pink/10 px-3.5 py-1.5 text-[0.8rem] font-semibold text-pink">
            <i className="fa-solid fa-calendar-check" aria-hidden="true" />
            By appointment only
          </span>
        ) : null}
      </div>

      {slots.length > 0 ? (
        <>
          <ul className="mt-4 grid grid-cols-7 gap-1 sm:gap-2">
            {WEEK.map((day) => {
              const slot = slots.find((entry) => entry.days.includes(day.name));

              return (
                <li
                  key={day.name}
                  title={`${day.name} — ${describeDay(slot)}`}
                  className={`flex flex-col items-center gap-1 rounded-xl px-0.5 py-2.5 sm:px-1 ${
                    slot
                      ? "bg-primary text-white shadow-card"
                      : "border border-line bg-white text-muted-foreground"
                  }`}
                >
                  <span className="text-[0.7rem] font-bold tracking-[0.5px] uppercase">
                    {day.short}
                  </span>
                  <i
                    className={`text-[0.8rem] ${
                      slot
                        ? slot.session
                          ? SESSION_ICON[slot.session]
                          : "fa-solid fa-check"
                        : "fa-solid fa-minus opacity-45"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{describeDay(slot)}</span>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-[0.95rem]">
            <span className="font-semibold text-ink">Consulting on </span>
            {slots.map(formatSlot).join(" · ")}.
          </p>

          {sessionsUsed.length > 0 ? (
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.85rem]">
              {sessionsUsed.map((session) => (
                <span
                  key={session}
                  className="inline-flex items-center gap-1.5"
                >
                  <i
                    className={`text-primary ${SESSION_ICON[session]}`}
                    aria-hidden="true"
                  />
                  {session} session
                </span>
              ))}
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-[0.95rem]">{note}</p>
      )}

      <p className="-mx-5 mt-4 border-t border-line px-5 pt-4 text-[0.9rem]">
        {slots.length > 0 ? "Days can change at short notice — call " : "Call "}
        <a
          href={telHref}
          className="font-semibold whitespace-nowrap text-primary hover:underline"
        >
          {site.phonePrimary}
        </a>
        {slots.length > 0
          ? ` to confirm ${doctorName}'s next slot.`
          : ` and we'll arrange a time with ${doctorName}.`}
      </p>
    </div>
  );
}

/** Screen-reader and tooltip wording for one square of the week strip. */
function describeDay(slot: AvailabilitySlot | undefined): string {
  if (!slot) return "Not consulting";
  if (slot.session) return `${slot.session} session`;
  return "Consulting";
}

function formatSlot(slot: AvailabilitySlot): string {
  const days =
    slot.days.length === 1
      ? slot.days[0]
      : `${slot.days.slice(0, -1).join(", ")} & ${slot.days.at(-1)}`;

  return slot.session ? `${days} (${slot.session.toLowerCase()}s)` : days;
}
