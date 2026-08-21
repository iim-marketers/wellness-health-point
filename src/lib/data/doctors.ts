import type { Doctor } from "@/lib/types";

/**
 * Seed data for the clinic's doctors, taken from the original static site.
 *
 * Each `description` is the doctor's About text, and it says only what that
 * doctor's own poster in `public/images` says — headline, body line, feature
 * pills, and the qualifications and availability where the poster prints them.
 * Two of the posters are in Bengali; those are translated, not embellished.
 * Nothing that is not on the poster belongs in it.
 * This is what the placeholder API routes serve until the Node.js backend
 * takes over (see NEXT_PUBLIC_API_URL in .env.example).
 */
export const doctors: Doctor[] = [
  {
    id: "sayan-bose",
    name: "Dr. Sayan Bose",
    speciality: "Consultant Paediatrician",
    tagline: "Child Healthcare & Growth Monitoring",
    qualifications: ["MBBS", "MD (Paediatrics)"],
    experienceYears: 12,
    image: "/images/dr.sayan.jpeg",
    department: "Pediatrics",
    description:
      "An experienced and caring paediatrician at Khardah Wellness Health Point, consulting for the good health and proper development of your child. Child-friendly care, complete growth monitoring and compassionate consultation. Available Tuesday, Thursday and Saturday, on appointment only.",
    languages: ["English", "Hindi", "Bengali"],
    availability: {
      slots: [{ days: ["Tuesday", "Thursday", "Saturday"] }],
      appointmentOnly: true,
    },
    // consultationFee: 600,
  },
  {
    id: "sayantani-bhanja",
    name: "Dr. Sayantani Bhanja",
    speciality: "Consultant Gynaecologist",
    tagline: "Women's Health & Pregnancy Care",
    qualifications: ["MBBS", "MS (Obstetrics & Gynaecology)"],
    experienceYears: 10,
    image: "/images/dr.sayantani.jpeg",
    department: "Gynecology",
    description:
      "Trusted and compassionate gynaecological care — from routine check-ups to specialised advice. Expert gynaecological care, compassionate consultation and personalised women's healthcare. Available Tuesday, Wednesday, Friday, Saturday and Sunday evenings, by appointment only.",
    languages: ["English", "Hindi", "Bengali"],
    availability: {
      slots: [
        {
          days: ["Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
          session: "Evening",
        },
      ],
      appointmentOnly: true,
    },
    // consultationFee: 700,
  },
  {
    id: "riya-das",
    name: "Dr. Riya Das",
    speciality: "ENT Specialist",
    tagline: "Ear, Nose & Throat Care",
    qualifications: ["MBBS", "MS (ENT)"],
    experienceYears: 8,
    image: "/images/dr-riya.png",
    department: "ENT",
    description:
      "An experienced specialist consulting regularly at Khardah Wellness Health Point, with modern solutions for ear, nose, throat and head-and-neck problems. MBBS (Hons), MSc, DNB. Available Tuesday, Wednesday, Friday, Saturday and Sunday evenings, by appointment only.",
    languages: ["English", "Hindi", "Bengali"],
    availability: {
      slots: [
        {
          days: ["Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
          session: "Evening",
        },
      ],
      appointmentOnly: true,
    },
    // consultationFee: 600,
  },
  {
    id: "manas-mukul-mondal",
    name: "Dr. Manas Mukul Mondal",
    speciality: "General & Laparoscopic Surgeon",
    tagline: "Advanced Surgical Care",
    qualifications: ["MBBS", "MS (General Surgery)", "FMAS"],
    experienceYears: 18,
    image: "/images/dr-manas.png",
    department: "Surgery",
    description:
      "An experienced general and laparoscopic surgeon. MBBS, MS (General Surgery), DNB (Surgery); Fellowship in Minimal Access Surgery (FMAS); Fellow of the Association of Surgeons of India (FAIS). Registration no. 72493 (WBMC). Available by appointment only.",
    languages: ["English", "Hindi", "Bengali"],
    availability: {
      slots: [],
      appointmentOnly: true,
      note: "No fixed clinic days — consultations are arranged individually to suit you.",
    },
    // consultationFee: 800,
  },
  {
    id: "ayan-dey",
    name: "Dr. Ayan Dey",
    speciality: "Physician & Diabetologist",
    tagline: "Diabetes & Lifestyle Management",
    qualifications: ["MBBS", "MD (General Medicine)", "PGDip (Diabetology)"],
    experienceYears: 14,
    image: "/images/dr-ayandey.jpg",
    department: "Diabetology",
    description:
      "Physician and diabetologist — from everyday physical complaints through to blood sugar control, expert advice for a healthy, worry-free life. Diabetes management, lifestyle disorder care and personalised treatment. Available Monday and Tuesday, and on Wednesday mornings, by appointment only.",
    languages: ["English", "Hindi", "Bengali"],
    availability: {
      slots: [
        { days: ["Monday", "Tuesday"] },
        { days: ["Wednesday"], session: "Morning" },
      ],
      appointmentOnly: true,
    },
    // consultationFee: 650,
  },
  {
    id: "smarajit-dutta",
    name: "Dr. Smarajit Dutta",
    speciality: "General Physician",
    tagline: "Comprehensive Health Care",
    qualifications: ["MBBS (WBUHS)", "Registration no. 90382 (WBMC)"],
    experienceYears: 12,
    image: "/images/dr-smarajit.png",
    department: "General Medicine",
    description:
      "An experienced general physician providing comprehensive health care. MBBS (WBUHS); Registration no. 90382 (WBMC). Available Thursday, Friday and Saturday, by appointment only.",
    languages: ["English", "Hindi", "Bengali"],
    availability: {
      slots: [{ days: ["Thursday", "Friday", "Saturday"] }],
      appointmentOnly: true,
    },
    // consultationFee: 700,
  },
];

export function findDoctor(id: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id);
}
