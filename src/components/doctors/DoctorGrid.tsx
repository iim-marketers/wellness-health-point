import DoctorCard from "@/components/doctors/DoctorCard";
import Reveal from "@/components/ui/Reveal";
import SwipeRow from "@/components/ui/SwipeRow";
import type { Doctor } from "@/lib/types";

/**
 * Below `md` the doctors are a swipeable row — six stacked cards was most of a
 * phone screen's worth of scrolling on its own.
 *
 * From `md` up the cards are subgrids spanning five parent rows, so the name,
 * speciality, tagline and action row start at the same height across a row —
 * no matter how many lines each doctor's text runs to. That needs the cards to
 * be direct grid items, which is what `subgrid` on the row arranges.
 */
export default function DoctorGrid({
  doctors,
  showBooking = false,
}: {
  doctors: Doctor[];
  showBooking?: boolean;
}) {
  return (
    // Revealed as one block rather than card by card: the cards are subgrids of
    // the row, so they can't be individually wrapped without losing the
    // row alignment.
    <Reveal>
      <SwipeRow
        label="Our doctors"
        subgrid
        gridClassName="md:grid-cols-2 xl:grid-cols-4"
        slideClassName="w-[68%] sm:w-[42%]"
      >
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            showBooking={showBooking}
            priority={index < 3}
          />
        ))}
      </SwipeRow>
    </Reveal>
  );
}
