import { after } from "next/server";

import { findDoctor } from "@/lib/data/doctors";
import { notifyClinic } from "@/lib/server/email";
import { asString, errorResponse, jsonError } from "@/lib/server/http";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { SubmissionPayload } from "@/lib/types";
import { hasErrors, validateSubmission } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: SubmissionPayload;
  try {
    payload = readPayload(await request.json());
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const wantsDoctor = payload.doctorId !== "";

  const errors = validateSubmission(payload, { requireDoctor: wantsDoctor });
  if (hasErrors(errors)) {
    return jsonError(
      Object.values(errors).find(Boolean) ?? "Please check the form.",
      400,
    );
  }

  try {
    const doctor = wantsDoctor ? findDoctor(payload.doctorId) : null;
    if (wantsDoctor && !doctor) {
      return jsonError("The selected doctor is no longer available.", 404);
    }

    // Only the contact details are stored. The doctor, department and reason
    // exist for the notification below and stop there — the clinic acts on the
    // email, so a stored copy would be one nothing reads.
    const { data, error } = await supabaseAdmin()
      .from("appointments")
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Failed to insert submission", error);
      return jsonError(
        "We could not send your details. Please try again.",
        502,
      );
    }

    after(() =>
      notifyClinic({
        id: data.id as string,
        createdAt: data.created_at as string,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        doctor: doctor?.name ?? null,
        department: doctor?.department ?? payload.department,
        reason: payload.reason,
      }),
    );

    return Response.json(
      {
        message: doctor
          ? "Thanks — your appointment request has been received. We'll call you shortly to confirm."
          : "Thanks for reaching out — our team will call you shortly.",
      },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error, "Could not save your details.");
  }
}

function readPayload(body: unknown): SubmissionPayload {
  const raw = (body ?? {}) as Record<string, unknown>;
  return {
    name: asString(raw.name),
    email: asString(raw.email),
    phone: asString(raw.phone),
    department: asString(raw.department),
    doctorId: asString(raw.doctorId),
    reason: asString(raw.reason),
  };
}
