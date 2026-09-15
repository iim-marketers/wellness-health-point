/**
 * Terms of Service, transcribed from
 * `Wellness_Health_Point_Terms_of_Service_Draft.pdf` in this folder. Keep the
 * two in step when the client revises the wording.
 */

export interface PolicySection {
  title: string;
  paragraphs?: string[];
  /** Rendered as a bulleted list after any paragraphs. */
  items?: string[];
}

/** Shown under the page heading once the client confirms a date. */
export const TERMS_LAST_UPDATED: string | null = "15 September 2026";

export const TERMS_PATH = "/terms";

export const termsSections: PolicySection[] = [
  {
    title: "Introduction",
    paragraphs: [
      'These Terms of Service ("Terms") govern access to and use of https://www.thewellnesshealthpoint.com/ ("Website"). By accessing or using the Website, you agree to these Terms.',
    ],
  },
  {
    title: "About the Website",
    paragraphs: [
      "The Website provides information about The Wellness Health Point, its healthcare services, medical departments, healthcare professionals, diagnostic services and appointment facilities. The website currently presents consulting departments and diagnostic services including pathology, ECG, Holter monitoring and PFT.",
    ],
  },
  {
    title: "Healthcare Disclaimer",
    paragraphs: [
      "Website information is for general informational purposes and is not a substitute for professional medical advice, diagnosis or treatment. A healthcare professional should evaluate an individual's medical condition before decisions are made regarding diagnosis or treatment. Do not rely solely on Website information to diagnose, treat or prevent a medical condition.",
    ],
  },
  {
    title: "No Emergency Medical Service",
    paragraphs: [
      "The Website is not intended for emergency medical communication or emergency medical treatment. If you believe you are experiencing a medical emergency, contact your local emergency medical service or visit an appropriate emergency medical facility immediately.",
    ],
  },
  {
    title: "Doctor and Healthcare Professional Information",
    paragraphs: [
      "Information about doctors, specialists, departments and healthcare services is provided for general informational purposes. Availability, timings, services and personnel may change. Listing a healthcare professional does not guarantee availability at a particular time or any particular treatment outcome.",
    ],
  },
  {
    title: "Appointment Requests",
    paragraphs: [
      "Submitting an appointment or callback request does not necessarily constitute confirmation of an appointment. An appointment is considered confirmed only after confirmation by The Wellness Health Point or its authorised representative. Availability, timings and services may change.",
    ],
  },
  {
    title: "User Information",
    paragraphs: [
      "Users agree to provide accurate and non-misleading information and should not submit another person's information without appropriate authority or consent. Personal information submitted through the Website is subject to the Privacy Policy.",
    ],
  },
  {
    title: "Medical Information Submitted Online",
    paragraphs: [
      "Users should avoid submitting unnecessary sensitive medical information through general enquiry forms. Online communication should not be treated as a substitute for an in-person medical consultation where one is required.",
    ],
  },
  {
    title: "Website Content",
    paragraphs: [
      "Reasonable efforts are made to keep Website information accurate and current. However, healthcare information, doctor availability, services, facilities, timings and other content may change, and we do not guarantee that all content will always be complete, accurate, current or error-free.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, Website content, including text, graphics, logos, images, design elements and other materials, is owned by or licensed to The Wellness Health Point. Content may not be reproduced, modified, distributed, published, sold or commercially exploited without prior written permission, except as permitted by law.",
    ],
  },
  {
    title: "Prohibited Use",
    items: [
      "Use the Website for unlawful purposes.",
      "Attempt to gain unauthorised access to the Website or its systems.",
      "Interfere with Website security or operation.",
      "Submit false, misleading or fraudulent information.",
      "Upload malicious software or harmful code.",
      "Use automated systems to abuse, scrape or disrupt the Website.",
      "Use the Website in a manner that violates applicable laws or regulations.",
    ],
  },
  {
    title: "Third-Party Services and Links",
    paragraphs: [
      "The Website may use or link to third-party services, websites or technologies. We are not responsible for third-party content, availability, security or privacy practices. Third-party services may have their own terms and privacy policies.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, The Wellness Health Point shall not be liable for indirect, incidental, consequential or other losses arising from use of, or inability to use, the Website or reliance on Website information. Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.",
    ],
  },
  {
    title: "Website Availability",
    paragraphs: [
      "We may modify, suspend or discontinue any part of the Website temporarily or permanently. We do not guarantee that the Website will always be available, uninterrupted, secure or error-free.",
    ],
  },
  {
    title: "Privacy",
    paragraphs: [
      "Use of the Website is also governed by our Privacy Policy, which explains how personal information is collected, used and protected.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Updated Terms will be published on this page with a revised Last Updated date.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms shall be governed by and interpreted in accordance with the laws of India. Disputes arising in connection with these Terms or use of the Website shall be subject to the jurisdiction of courts having appropriate jurisdiction in India.",
    ],
  },
];
