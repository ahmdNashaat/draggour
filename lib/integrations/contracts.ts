export type RequesterType = "patient" | "physician";
export type Urgency = "emergency" | "nonEmergency";
export type ConsultationService = "online" | "clinic";

export interface StaffNotification {
  requestId: string;
  requesterType: RequesterType;
  service?: ConsultationService;
  attachmentCount: number;
  receivedAt: string;
}

export interface WhatsAppConfirmation {
  requestId: string;
  recipient: string;
}

export interface UploadRequest {
  requestId: string;
  maxFiles: number;
  allowedMimeTypes: readonly string[];
}

export interface UploadSession {
  uploadUrl: string;
  expiresAt: string;
}

export interface StaffNotificationAdapter {
  sendStaffNotification(input: StaffNotification): Promise<void>;
}

export interface WhatsAppAdapter {
  sendWhatsAppNotification(input: WhatsAppConfirmation): Promise<void>;
}

export interface WhatsAppWebhookAdapter {
  handleWhatsAppWebhook(input: unknown): Promise<void>;
}

export interface FileAdapter {
  createUploadSession(input: UploadRequest): Promise<UploadSession>;
}

export interface ConsultationAdapters {
  staff: StaffNotificationAdapter;
  whatsapp: WhatsAppAdapter;
  files?: FileAdapter;
  whatsappWebhook?: WhatsAppWebhookAdapter;
}
