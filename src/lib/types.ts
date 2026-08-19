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
  availableDays: string[];
  // consultationFee: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;

  icon: string;
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
