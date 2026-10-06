import type { Locale } from "@/content/site";

/**
 * Legal & Privacy page content (DECISIONS.md D-034, simplified by D-035).
 *
 * The page is deliberately small: four parts (Privacy Notice, Medical
 * Disclaimer, Remote Consultation Terms, Cookies & Analytics) written as short
 * prose. Its purpose is trust and transparency, not ranking — SEO depth lives
 * on the clinical and biography pages.
 *
 * `LEGAL_PLACEHOLDERS` lists the values that must still be supplied by the
 * client before launch. It is empty as of D-043: the operator name is
 * published, and the clauses that carried the other three tokens were removed
 * because WhatsApp is the practice's primary correspondence channel. Any token
 * added back is rendered visibly on purpose and guarded by
 * `tests/legal.privacy.spec.ts`: removing one without publishing the real
 * value fails the suite.
 */

export const LEGAL_PLACEHOLDERS = [] as const;

export type LegalPlaceholder = (typeof LEGAL_PLACEHOLDERS)[number];

export type LegalBlock =
  | Readonly<{ type: "paragraph"; text: string }>
  | Readonly<{ type: "subheading"; text: string }>
  | Readonly<{ type: "note"; text: string }>
  | Readonly<{ type: "flow"; items: readonly string[] }>;

export type LegalPart = Readonly<{
  id: string;
  title: string;
  blocks: readonly LegalBlock[];
}>;

const privacyNoticeEn: readonly LegalPart[] = [
  {
    id: "privacy-notice",
    title: "Privacy Notice",
    blocks: [
      {
        type: "paragraph",
        text: "This website is operated by Mohamed Aggour as the professional website of Dr. Mohamed Aggour. It explains how personal information is handled when you visit the site, contact the practice, or send a consultation or referral request.",
      },
      { type: "subheading", text: "What we collect" },
      {
        type: "paragraph",
        text: "We collect only what you choose to give us — name, email, phone or WhatsApp number, consultation or referral details, and any medical information you decide to include.",
      },
      { type: "subheading", text: "How we use it" },
      {
        type: "paragraph",
        text: "We use this information to answer you, to review and coordinate your request, to keep the website secure, and to meet legal obligations. We never sell personal information.",
      },
      { type: "subheading", text: "Health information" },
      {
        type: "paragraph",
        text: "Medical details are treated as sensitive information, used only to coordinate your request, and shared only with the people involved in it. Please do not send medical records through ordinary email or messaging unless a secure channel has been agreed.",
      },
    ],
  },
];

const medicalDisclaimerEn: readonly LegalPart[] = [
  {
    id: "medical-disclaimer",
    title: "Medical Disclaimer",
    blocks: [
      {
        type: "paragraph",
        text: "Educational information on this website is provided for general information only. It does not replace an individual consultation, diagnosis or treatment plan from a qualified healthcare professional.",
      },
      {
        type: "note",
        text: "Nothing sent through this website creates a doctor-patient relationship until such a relationship is formally established.",
      },
    ],
  },
];

const remoteConsultationTermsEn: readonly LegalPart[] = [
  {
    id: "remote-consultation-terms",
    title: "Remote Consultation Terms",
    blocks: [
      {
        type: "paragraph",
        text: "Sending a consultation request does not confirm an appointment. A request is reviewed by the doctor or authorised staff, and the arrangement, availability, consultation method and any payment are confirmed separately:",
      },
      {
        type: "flow",
        items: [
          "Request submitted",
          "Human review",
          "Appointment coordination",
          "Confirmation",
          "Payment and consultation",
        ],
      },
      {
        type: "paragraph",
        text: "A request is not a confirmed appointment, a diagnosis, a treatment recommendation, a prescription, a payment confirmation, or an emergency service.",
      },
      {
        type: "note",
        text: "This website is not an emergency service. Contact local emergency services or attend the nearest emergency department, and do not wait for a website response.",
      },
    ],
  },
];

const cookiesAnalyticsEn: readonly LegalPart[] = [
  {
    id: "cookies-analytics",
    title: "Cookies & Analytics",
    blocks: [
      {
        type: "paragraph",
        text: "The website uses only the cookies needed to run it, including your language preference. Optional analytics or advertising cookies are activated only where consent rules allow, and consultation content is never used for analytics or advertising.",
      },
    ],
  },
];

const privacyNoticeAr: readonly LegalPart[] = [
  {
    id: "privacy-notice",
    title: "إشعار الخصوصية",
    blocks: [
      {
        type: "paragraph",
        text: "يُدار هذا الموقع باسم محمد عجور بوصفه الموقع المهني لدكتور محمد عجور. ويوضح كيفية التعامل مع المعلومات الشخصية عند زيارتك للموقع أو التواصل مع العيادة أو إرسال طلب استشارة أو إحالة.",
      },
      { type: "subheading", text: "ما الذي نجمعه" },
      {
        type: "paragraph",
        text: "نجمع فقط ما تختار تقديمه: الاسم والبريد الإلكتروني ورقم الهاتف أو واتساب وتفاصيل الاستشارة أو الإحالة وأي معلومات صحية تقرر إضافتها.",
      },
      { type: "subheading", text: "كيف نستخدمها" },
      {
        type: "paragraph",
        text: "نستخدم هذه المعلومات للرد عليك ولمراجعة طلبك وتنسيقها، ولحماية أمن الموقع، وللتزام الالتزامات القانونية. لا نبيع بياناتك الشخصية إطلاقاً.",
      },
      { type: "subheading", text: "المعلومات الصحية" },
      {
        type: "paragraph",
        text: "تُعامَل التفاصيل الطبية معاملة المعلومات الحساسة، وتُستخدم لتنسيق طلبك فقط، ولا تُشارك إلا مع الأشخاص المعنيين به. يرجى عدم إرسال السجلات الطبية عبر البريد العادي أو الرسائل إلا بعد الاتفاق على قناة آمنة.",
      },
    ],
  },
];

const medicalDisclaimerAr: readonly LegalPart[] = [
  {
    id: "medical-disclaimer",
    title: "إخلاء المسؤولية الطبية",
    blocks: [
      {
        type: "paragraph",
        text: "تُقدَّم المعلومات التعليمية في هذا الموقع لأغراض إعلامية عامة فقط، ولا تحل محل استشارة فردية أو تشخيص أو خطة علاج من مختص رعاية صحية مؤهل.",
      },
      {
        type: "note",
        text: "لا تنشئ أي معلومات تُرسَل عبر هذا الموقع علاقة بين الطبيب والمريض قبل أن تنشأ هذه العلاقة بشكل رسمي.",
      },
    ],
  },
];

const remoteConsultationTermsAr: readonly LegalPart[] = [
  {
    id: "remote-consultation-terms",
    title: "شروط الاستشارة عن بُعد",
    blocks: [
      {
        type: "paragraph",
        text: "إرسال طلب استشارة لا يؤكد موعداً. يُراجَع الطلب من الطبيب أو موظفين مصرّح لهم، وتُؤكَّد الترتيبات والمواعيد المتاحة وطريقة الاستشارة وأي دفع بشكل منفصل:",
      },
      {
        type: "flow",
        items: ["إرسال الطلب", "مراجعة بشرية", "تنسيق الموعد", "التأكيد", "الدفع والاستشارة"],
      },
      {
        type: "paragraph",
        text: "الطلب ليس موعداً مؤكَّداً ولا تشخيصاً ولا توصية علاجية ولا وصفة طبية ولا تأكيداً للدفع ولا خدمة طوارئ.",
      },
      {
        type: "note",
        text: "هذا الموقع ليس خدمة طوارئ. اتصل بخدمات الطوارئ المحلية أو توجّه إلى أقرب قسم طوارئ، ولا تنتظر رداً من الموقع.",
      },
    ],
  },
];

const cookiesAnalyticsAr: readonly LegalPart[] = [
  {
    id: "cookies-analytics",
    title: "ملفات الارتباط والتحليلات",
    blocks: [
      {
        type: "paragraph",
        text: "يستخدم الموقع ملفات الارتباط اللازم لتشغيله فقط، بما في ذلك تفضيل اللغة. أما ملفات التحليلات أو الإعلانات الاختيارية فتُفعَّل فقط عندما تسمح قواعد الموافقة بذلك، ولا يُستخدم محتوى الاستشارة أبداً لأغراض التحليلات أو الإعلانات.",
      },
    ],
  },
];

const legalContentEn: readonly LegalPart[] = [
  ...privacyNoticeEn,
  ...medicalDisclaimerEn,
  ...remoteConsultationTermsEn,
  ...cookiesAnalyticsEn,
];

const legalContentAr: readonly LegalPart[] = [
  ...privacyNoticeAr,
  ...medicalDisclaimerAr,
  ...remoteConsultationTermsAr,
  ...cookiesAnalyticsAr,
];

export function getLegalContent(locale: Locale): readonly LegalPart[] {
  return locale === "ar" ? legalContentAr : legalContentEn;
}
