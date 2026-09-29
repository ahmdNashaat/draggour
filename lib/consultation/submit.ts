import type { ConsultationAdapters } from "@/lib/integrations";
import { consultationSubmissionSchema } from "@/lib/validation/consultation";

export type ConsultationSubmissionResult =
  | { ok: true; requestId: string }
  | { ok: false; code: "invalid-input" | "emergency-guidance"; issues?: unknown };

/**
 * The future server-side orchestration seam. It is intentionally not wired to
 * a route or provider until the consultation workflow and vendors are approved.
 */
export async function submitConsultation(
  input: unknown,
  adapters: ConsultationAdapters,
): Promise<ConsultationSubmissionResult> {
  const parsed = consultationSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, code: "invalid-input", issues: parsed.error.issues };
  }

  if (parsed.data.urgency === "emergency") {
    return { ok: false, code: "emergency-guidance" };
  }

  const requestId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  await adapters.staff.sendStaffNotification({
    requestId,
    requesterType: parsed.data.requesterType,
    service: parsed.data.service,
    attachmentCount: parsed.data.attachmentCount,
    receivedAt,
  });

  // The recipient and final message contract remain part of provider setup.
  // This boundary deliberately does not choose a WhatsApp vendor or storage.
  return { ok: true, requestId };
}
