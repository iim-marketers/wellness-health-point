import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { site, telHref } from "@/lib/site";

/** The clinic's own artwork; opened at full size when the panel is tapped. */
const POSTER = "/clinic-images/doc-collage-beng.png";

/**
 * The team sheet in Bengali, for the local patients who don't read English.
 *
 * It is the clinic's printed poster, so it is shown whole rather than retyped
 * as markup — every doctor's name, degrees and sitting days are on it, and the
 * wording is the clinic's own. The surrounding copy is Bengali first with a
 * short English gloss underneath, since an English reader has the rest of the
 * page already.
 */
export default function BengaliTeamPoster() {
  return (
    <Section className="overflow-hidden bg-linear-[135deg,#eef7ff,#ffffff]">
      <Container>
        <Reveal className="grid items-center gap-9 lg:grid-cols-[0.95fr_1fr] lg:gap-14">
          <div className="text-center lg:text-left">
            {/* <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-[0.78rem] font-bold tracking-[1px] text-primary uppercase shadow-card">
              <i className="fa-solid fa-language" aria-hidden="true" />
              বাংলায় দেখুন
            </span> */}

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
