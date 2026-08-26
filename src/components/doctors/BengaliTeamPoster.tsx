import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

/** The clinic's own artwork; opened at full size when the panel is tapped. */
const POSTER = "/clinic-images/doctor-collage-beng.png";

export default function BengaliTeamPoster() {
  return (
    <Section className="overflow-hidden bg-linear-[135deg,#eef7ff,#ffffff]">
      <Container>
        <Reveal className="grid items-center gap-9 lg:grid-cols-[0.95fr_1fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <h2
              lang="bn"
              className="mt-4 font-bengali text-[1.55rem] leading-snug font-bold text-ink sm:text-[1.9rem] md:text-[2.2rem]"
            >
              আমাদের অভিজ্ঞ বিশেষজ্ঞ চিকিৎসকবৃন্দ
            </h2>

            <p lang="bn" className="mt-3.5 font-bengali text-[1.02rem]">
              সব বিশেষজ্ঞ ডাক্তারের নাম, ডিগ্রি ও চেম্বারে বসার দিন — এক নজরে,
              এক পাতায়।
            </p>
          </div>

          <div className="group relative mx-auto block w-full max-w-115 rounded-card bg-white p-2.5 shadow-panel sm:p-3">
            <Image
              src={POSTER}
              alt="Wellness Health Point's specialist doctors, their qualifications and clinic days, listed in Bengali"
              width={1122}
              height={1402}
              sizes="(min-width: 1101px) 460px, 92vw"
              className="h-auto w-full rounded-[calc(var(--radius-card)-6px)]"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
