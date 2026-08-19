/**
 * One block of days a doctor sits, narrowed to a half of the day where the
 * clinic has fixed it. A doctor whose week isn't uniform gets several — e.g.
 * full days Monday and Tuesday, then mornings only on Wednesday.
 */
export interface AvailabilitySlot {
  /** Full day names ("Tuesday"), so the week strip can match against them. */
  days: string[];
  /** Omitted when the sitting isn't tied to a half of the day. */
  session?: "Morning" | "Evening";
}

export interface Availability {
  /** Empty when the doctor keeps no fixed clinic days — `note` explains. */
  slots: AvailabilitySlot[];
  /** Every doctor here consults on appointment; kept explicit, not assumed. */
  appointmentOnly: boolean;
  /** Stands in for the week strip when there are no fixed days. */
  note?: string;
}

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  tagline: string;
  qualifications: string[];
  experienceYears: number;
  image: string;
  description: string;
  department: string;
  languages: string[];
  availability: Availability;
  // consultationFee: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;

  icon: string;
}

/** A test offered by the diagnostic centre, as the services page lists it. */
export interface Diagnostic {
  id: string;
  title: string;
  /** Plain-language gloss shown under the title, e.g. "Heart rhythm test". */
  subtitle: string;
  description: string;
  icon: string;
  /** Whether the test can also be carried out at the patient's address. */
  atHome: boolean;
  /** Wording for the home-service badge; omitted when `atHome` is false. */
  atHomeNote?: string;
}

export interface SubmissionPayload {
  name: string;
  email: string;
  phone: string;
  department: string;
  /** Only the appointment form sends this — an enquiry leaves it empty. */
  doctorId: string;
  reason: string;
}

/**
 * A submission as the clinic's notification email sees it.
 *
 * Wider than the stored row: `id` and `createdAt` come back from the insert,
 * while the department, doctor and reason are carried straight through from
 * the request. Those three are only ever emailed, never written to the table.
 */
export interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  /** The doctor's name, or null when the submission came from the enquiry form. */
  doctor: string | null;
  reason: string;
  createdAt: string;
}
