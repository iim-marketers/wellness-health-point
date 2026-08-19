import type { Diagnostic, Service } from "@/lib/types";

/** Consulting departments the clinic runs, in the order the clinic lists them. */
export const services: Service[] = [
  {
    id: "gynecology",
    title: "Gynecology",
    description:
      "Women's health, pregnancy and antenatal care, period and fertility concerns, and family planning.",
    icon: "fa-solid fa-person-pregnant",
  },
  {
    id: "ent",
    title: "ENT",
    description:
      "Ear, nose and throat care — hearing trouble, sinus problems, tonsils, and voice or throat complaints.",
    icon: "fa-solid fa-ear-listen",
  },
  {
    id: "surgery",
    title: "Surgery",
    description:
      "General and laparoscopic (keyhole) surgery, with consultation beforehand and follow-up care after.",
    icon: "fa-solid fa-hand-holding-medical",
  },
  {
    id: "diabetology",
    title: "Diabetology",
    description:
      "Diabetes diagnosis, blood sugar control, diet guidance and long-term lifestyle management.",
    icon: "fa-solid fa-droplet",
  },
  {
    id: "general-medicine",
    title: "General Medicine",
    description:
      "Everyday illnesses, fever, blood pressure and ongoing treatment of long-term conditions in adults.",
    icon: "fa-solid fa-stethoscope",
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    description:
      "Child healthcare from newborn to teenager — growth monitoring, vaccinations and common childhood illnesses.",
    icon: "fa-solid fa-baby",
  },
];

/**
 * Tests run in-house. `atHome` marks the ones a technician can also do at the
 * patient's address, which is what the cards badge and the strip below them
 * summarise — plain English, because most patients won't know the acronyms.
 */
export const diagnostics: Diagnostic[] = [
  {
    id: "pathology",
    title: "All Pathology Tests",
    subtitle: "Blood, urine & lab testing",
    description:
      "The full range of laboratory tests, from routine blood and urine checks to specialised panels, with accurate and timely reports.",
    icon: "fa-solid fa-vials",
    atHome: true,
    atHomeNote: "Sample collected at home",
  },
  {
    id: "ecg",
    title: "ECG",
    subtitle: "Heart rhythm test",
    description:
      "A quick, painless recording of your heart's rhythm, used to check for heart trouble. Takes only a few minutes.",
    icon: "fa-solid fa-heart-pulse",
    atHome: true,
    atHomeNote: "Also done at home",
  },
  {
    id: "holter",
    title: "Holter Monitoring",
    subtitle: "24-hour heart recording",
    description:
      "A small monitor you wear through the day so your heartbeat is recorded during normal activity — useful when symptoms come and go.",
    icon: "fa-solid fa-wave-square",
    atHome: true,
    atHomeNote: "Home service",
  },
  {
    id: "pft",
    title: "PFT",
    subtitle: "Pulmonary function test",
    description:
      "A simple breathing test that measures how well your lungs are working. Commonly advised for asthma, breathlessness and long-term cough.",
    icon: "fa-solid fa-lungs",
    atHome: false,
  },
];

/** Department names offered in the appointment and contact forms. */
export const departments = [
  ...services.map((service) => service.title),
  "Diagnostics & Tests",
];
