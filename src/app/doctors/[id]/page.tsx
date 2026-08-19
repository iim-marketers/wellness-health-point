import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DoctorAvailability from "@/components/doctors/DoctorAvailability";
import DoctorPortrait from "@/components/doctors/DoctorPortrait";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { ApiError } from "@/lib/api/client";
import { getDoctorById, getDoctors } from "@/lib/api/doctors";
import { doctorOgImage, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import type { Doctor } from "@/lib/types";

/** Pre-renders a static page per doctor; new ones are rendered on demand. */
export async function generateStaticParams() {
  try {
    const doctors = await getDoctors();
    return doctors.map((doctor) => ({ id: doctor.id }));
  } catch {
    return [];
  }
}

async function loadDoctor(id: string): Promise<Doctor> {
  try {
    return await getDoctorById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

export async function generateMetadata(
  props: PageProps<"/doctors/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;

  try {
    const doctor = await getDoctorById(id);
    return pageMetadata({
      title: doctor.name,
      description: `${doctor.name} — ${doctor.speciality} at ${site.name}. Book a consultation online.`,
      path: `/doctors/${doctor.id}`,
      image: {
        ...doctorOgImage(doctor.image),
        alt: `${doctor.name}, ${doctor.speciality}`,
      },
      type: "profile",
    });
  } catch {
    // An unknown id renders the 404 below; don't let it be indexed.
    return { title: "Doctor", robots: { index: false, follow: true } };
  }
}

const SUBHEADING =
  "mt-6.5 mb-3 font-display text-[1.2rem] font-semibold text-ink";

/** "Dr. Sayan Bose" -> "Dr. Bose", for buttons and running text. */
function shortName(name: string): string {
  const parts = name.split(" ");
  return parts.length > 1 ? `${parts[0]} ${parts.at(-1)}` : name;
}

export default async function DoctorDetailPage(
  props: PageProps<"/doctors/[id]">,
) {
  const { id } = await props.params;
  const doctor = await loadDoctor(id);

  return (
    <Section>
      <Container>
        <div className="grid items-start gap-7.5 lg:grid-cols-[320px_1fr] lg:gap-12.5">
          <Reveal
            className="mx-auto max-w-80 rounded-card bg-white p-6 text-center shadow-card lg:mx-0 lg:max-w-none"
            onMount
          >
            <DoctorPortrait
              src={doctor.image}
              alt={doctor.name}
              className="mb-5"
            />
          </Reveal>

          <Reveal delay={0.1} onMount>
            <h1 className="mb-1.5 font-display text-[1.65rem] font-bold text-ink sm:text-[1.9rem] lg:text-[2.4rem]">
              {doctor.name}
            </h1>
            <p className="text-[1.1rem] font-semibold text-primary">
              {doctor.speciality}
            </p>

            <h3 className={SUBHEADING}>About</h3>
            <p>{doctor.description}</p>

            <div className="mt-6.5">
              <DoctorAvailability
                availability={doctor.availability}
                doctorName={shortName(doctor.name)}
              />
            </div>

            <div className="mt-7.5 flex flex-wrap items-center justify-center gap-3.5 md:justify-start">
              <ButtonLink
                href={`/appointment?doctor=${doctor.id}`}
                block={false}
              >
                Book with {shortName(doctor.name)}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
