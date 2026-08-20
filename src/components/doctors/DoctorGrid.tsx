import DoctorCard from "@/components/doctors/DoctorCard";
import Reveal from "@/components/ui/Reveal";
import SwipeRow from "@/components/ui/SwipeRow";
import type { Doctor } from "@/lib/types";

export default function DoctorGrid({
  doctors,
  showBooking = false,
}: {
  doctors: Doctor[];
  showBooking?: boolean;
}) {
  return (
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
