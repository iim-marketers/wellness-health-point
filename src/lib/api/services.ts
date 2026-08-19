import { diagnostics, services } from "@/lib/data/services";
import type { Diagnostic, Service } from "@/lib/types";

/** Seed data, like doctors — see the note in `src/lib/api/doctors.ts`. */
export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getDiagnostics(): Promise<Diagnostic[]> {
  return diagnostics;
}
