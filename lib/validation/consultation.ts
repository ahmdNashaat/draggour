import { z } from "zod";

export const allowedAttachmentMimeTypes = ["application/pdf", "image/jpeg", "image/png"] as const;

const sharedFields = {
  requesterType: z.enum(["patient", "physician"]),
  attachmentCount: z.number().int().min(0).max(3),
};

export const consultationSubmissionSchema = z.discriminatedUnion("urgency", [
  z.object({
    ...sharedFields,
    urgency: z.literal("emergency"),
    service: z.undefined().optional(),
  }),
  z.object({
    ...sharedFields,
    urgency: z.literal("nonEmergency"),
    service: z.enum(["online", "clinic"]),
  }),
]);

export type ConsultationSubmission = z.infer<typeof consultationSubmissionSchema>;
