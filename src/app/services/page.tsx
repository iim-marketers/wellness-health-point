import type { Metadata } from "next";
import Image from "next/image";

import Hero, { HeroContent } from "@/components/layout/Hero";
import DiagnosticCard from "@/components/services/DiagnosticCard";
import HomeCollectionCallout from "@/components/services/HomeCollectionCallout";
import ServiceCard from "@/components/services/ServiceCard";
import Alert from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { toErrorMessage } from "@/lib/api/client";
import { getDiagnostics, getServices } from "@/lib/api/services";
import { OG_IMAGES, pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import type { Diagnostic, Service } from "@/lib/types";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Comprehensive healthcare under one roof — gynecology, ENT, surgery, diabetology, general medicine and pediatrics, plus a full diagnostic centre with home collection.",
  path: "/services",
  image: {
    ...OG_IMAGES.services,
    alt: `Departments and services at ${site.name}`,
  },
});

const PROCESS = [
  {
    icon: "fa-solid fa-calendar-plus",
    title: "Book",
    description: "Send us your details and we'll call you back.",
  },
  {
    icon: "fa-solid fa-user-doctor",
    title: "Consult",
    description: "Meet our experienced medical team.",
  },
  {
    icon: "fa-solid fa-file-medical",
    title: "Diagnosis",
    description: "Receive accurate reports and advice.",
  },
  {
    icon: "fa-solid fa-heart",
    title: "Follow-up",
    description: "Ongoing care for better health.",
  },
];

export default async function ServicesPage() {
  let services: Service[] = [];
  let diagnostics: Diagnostic[] = [];
  let error: string | undefined;

  try {
    [services, diagnostics] = await Promise.all([
      getServices(),
      getDiagnostics(),
    ]);
  } catch (caught) {
    error = toErrorMessage(caught);
  }

  return (
    <>
      <Hero>
        <HeroContent>
          <div className="w-full lg:max-w-150">
            <span className="text-[0.78rem] font-bold tracking-[1px] text-pink uppercase sm:text-base">
              Our Services
            </span>
            <h1 className="my-3 font-display text-[1.95rem] leading-tight font-bold text-ink sm:text-[2.3rem] md:my-4 lg:text-[2.9rem]">
              Comprehensive Healthcare Under One Roof
            </h1>
            <p className="mx-auto mb-7 max-w-140 lg:mx-0">
              Six consulting departments and a full diagnostic centre in one
              place — so a consultation, a test and its report never mean three
              separate trips. Home collection is available if you can&apos;t
              come in.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:flex-row lg:justify-start">
              <ButtonLink href="/appointment">Book Appointment</ButtonLink>
              <ButtonLink href="#diagnostics" variant="secondary">
                Diagnostics &amp; Tests
              </ButtonLink>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center">
            <Image
              src="/clinic-images/services.jpeg"
              alt="Healthcare services at Wellness Health Point"
              width={620}
              height={620}
              priority
              className="mx-auto h-auto max-w-full rounded-card lg:max-w-110"
            />
          </div>
        </HeroContent>
      </Hero>

      <Section id="services">
        <Container>
          <SectionTitle
            eyebrow="Our Specialities"
            title="Consulting Departments"
            description="Six specialities, each run by an experienced consultant. Pick the one that matches your concern — call us if you're unsure and we'll guide you."
          />

          {error ? (
            <Alert variant="error">{error}</Alert>
          ) : (
            <RevealGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      <Section id="diagnostics" className="bg-mist">
        <Container>
          <SectionTitle
            eyebrow="Diagnostic Centre"
            title="Tests & Diagnostics"
            description="Every test below is done in-house, and the ones marked can be carried out at your home instead."
          />

          {error ? (
            <Alert variant="error">{error}</Alert>
          ) : (
            <>
              <RevealGroup className="grid gap-6 md:grid-cols-2">
                {diagnostics.map((diagnostic) => (
                  <DiagnosticCard key={diagnostic.id} diagnostic={diagnostic} />
                ))}
              </RevealGroup>

              <Reveal>
                <HomeCollectionCallout />
              </Reveal>
            </>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="Our Process" title="Getting Care Is Simple" />
          <RevealGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PROCESS.map((step) => (
              <FeatureCard key={step.title} {...step} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section className="bg-linear-[135deg,#0a6ebd,#0c4f84] text-white">
        <Reveal>
          <Container className="flex flex-col items-center gap-6.5 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h2 className="font-display text-[1.65rem] font-bold sm:text-[1.9rem] md:text-[2.3rem]">
                Need Expert Medical Care?
              </h2>
              <p>Book an appointment today with our specialists.</p>
            </div>
            <ButtonLink href="/appointment" variant="onDark">
              Book Appointment
            </ButtonLink>
          </Container>
        </Reveal>
      </Section>
    </>
  );
}
