import { type Locale } from "@/content/site";

/**
 * WhatsApp hand-off for the remote-consultation CTA (DECISIONS.md D-036).
 *
 * The website has no consultation form: the only action on `/remote-consultation`
 * is a link that opens a WhatsApp conversation, and the chatbot on the other
 * side collects everything the practice needs.
 *
 * This is published page content, not a secret — the number is rendered on the
 * page, so it is never taken from an environment variable. The operational
 * `WHATSAPP_*` values used by `lib/integrations` stay separate.
 */
type ConsultationWhatsapp = {
  /**
   * International format, digits only: no "+", no spaces, no dashes.
   * `null` means the client has not supplied the number yet — the CTA then
   * renders disabled beside a visible `[WHATSAPP NUMBER]` placeholder.
   */
  number: string | null;
  /** Pre-filled greeting opened with the chat, one per launch locale. */
  greeting: Record<Locale, string>;
};

export const consultationWhatsapp: ConsultationWhatsapp = {
  number: null,
  greeting: {
    en: "Hello, I would like to request a remote consultation with Dr. Mohamed Aggour.",
    ar: "مرحباً، أودّ طلب استشارة عن بُعد مع دكتور محمد عجور.",
    fr: "Bonjour, je souhaite demander une consultation à distance avec le Dr Mohamed Aggour.",
  },
};

/** Visible placeholder used while `number` is not supplied (see D-036). */
export const whatsappPlaceholder = "[WHATSAPP NUMBER]";

const digitsOnly = /^[0-9]{7,15}$/;

export function isConsultationWhatsappConfigured(): boolean {
  return consultationWhatsapp.number !== null && digitsOnly.test(consultationWhatsapp.number);
}

/** `https://wa.me/<number>?text=<greeting>`, or `null` while unconfigured. */
export function getConsultationWhatsappUrl(locale: Locale): string | null {
  const number = consultationWhatsapp.number;

  if (!number || !digitsOnly.test(number)) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(consultationWhatsapp.greeting[locale])}`;
}
