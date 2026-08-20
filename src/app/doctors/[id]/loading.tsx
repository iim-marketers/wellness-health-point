import Container from "@/components/ui/Container";
import { DoctorDetailSkeleton } from "@/components/ui/Loading";
import Section from "@/components/ui/Section";

/** Shown while a profile that wasn't pre-rendered is being fetched. */
export default function DoctorDetailLoading() {
  return (
    <Section>
      <Container>
        <DoctorDetailSkeleton />
      </Container>
    </Section>
  );
}
