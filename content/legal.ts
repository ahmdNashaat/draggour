import type { Locale } from "@/content/site";

/**
 * Legal & Privacy page content (DECISIONS.md D-034, simplified by D-035).
 *
 * The page is deliberately small: four parts (Privacy Notice, Medical
 * Disclaimer, Remote Consultation Terms, Cookies & Analytics) written as short
 * prose. Its purpose is trust and transparency, not ranking — SEO depth lives
 * on the clinical and biography pages.
 *
 * `LEGAL_PLACEHOLDERS` lists the four values that must be supplied by the
 * client before launch. They are rendered visibly on purpose and are guarded
 * by `tests/legal.privacy.spec.ts`: removing one without publishing the real
 * value fails the suite.
 */

export const LEGAL_PLACEHOLDERS = [
  "[LEGAL NAME]",
  "[PRIVACY EMAIL]",
  "[SERVICE PROVIDERS]",
  "[RETENTION PERIODS]",
] as const;

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
        text: "This website is operated by [LEGAL NAME] as the professional website of Dr. Mohamed Aggour. It explains how personal information is handled when you visit the site, contact the practice, or send a consultation or referral request.",
      },
      { type: "subheading", text: "What we collect" },
      {
        type: "paragraph",
        text: "We collect only what you choose to give us — name, email, phone or WhatsApp number, consultation or referral details, and any medical information you decide to include — plus basic technical data such as IP address, browser, and pages visited.",
      },
      { type: "subheading", text: "How we use it" },
      {
        type: "paragraph",
        text: "We use this information to answer you, to review and coordinate your request, to keep the website secure, and to meet legal obligations. We never sell personal information. The website runs with the help of: [SERVICE PROVIDERS].",
      },
      { type: "subheading", text: "Health information" },
      {
        type: "paragraph",
        text: "Medical details are treated as sensitive information, used only to coordinate your request, and shared only with the people involved in it. Please do not send medical records through ordinary email or messaging unless a secure channel has been agreed.",
      },
      { type: "subheading", text: "Retention" },
      {
        type: "paragraph",
        text: "We keep information only as long as it is needed for the purpose it was sent for: [RETENTION PERIODS]. After that it is deleted or anonymised.",
      },
      { type: "subheading", text: "Your rights and contact" },
      {
        type: "paragraph",
        text: "You may ask to access, correct or delete your information, or object to its use, by writing to [PRIVACY EMAIL]. We may ask for proof of identity first.",
      },
      {
        type: "paragraph",
        text: "This notice may be updated from time to time; the date above always shows the latest version.",
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
        text: "يُدار هذا الموقع باسم [LEGAL NAME] بوصفه الموقع المهني لدكتور محمد عجور. ويوضح كيفية التعامل مع المعلومات الشخصية عند زيارتك للموقع أو التواصل مع العيادة أو إرسال طلب استشارة أو إحالة.",
      },
      { type: "subheading", text: "ما الذي نجمعه" },
      {
        type: "paragraph",
        text: "نجمع فقط ما تختار تقديمه: الاسم والبريد الإلكتروني ورقم الهاتف أو واتساب وتفاصيل الاستشارة أو الإحالة وأي معلومات صحية تقرر إضافتها، إضافة إلى بيانات تقنية أساسية مثل عنوان IP ونوع المتصفح والصفحات التي تمت زيارتها.",
      },
      { type: "subheading", text: "كيف نستخدمها" },
      {
        type: "paragraph",
        text: "نستخدم هذه المعلومات للرد عليك ولمراجعة طلبك وتنسيقها، ولحماية أمن الموقع، وللتزام الالتزامات القانونية. لا نبيع بياناتك الشخصية إطلاقاً. ويُشغَّل الموقع بالتعاون مع: [SERVICE PROVIDERS].",
      },
      { type: "subheading", text: "المعلومات الصحية" },
      {
        type: "paragraph",
        text: "تُعامَل التفاصيل الطبية معاملة المعلومات الحساسة، وتُستخدم لتنسيق طلبك فقط، ولا تُشارك إلا مع الأشخاص المعنيين به. يرجى عدم إرسال السجلات الطبية عبر البريد العادي أو الرسائل إلا بعد الاتفاق على قناة آمنة.",
      },
      { type: "subheading", text: "مدة الاحتفاظ" },
      {
        type: "paragraph",
        text: "نحتفظ بالمعلومات للمدة اللازمة فقط لتحقيق الغرض الذي أُرسلت من أجله: [RETENTION PERIODS]. وبعد ذلك تُحذف أو تُطمس.",
      },
      { type: "subheading", text: "حقوقك وتواصلك" },
      {
        type: "paragraph",
        text: "يمكنك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها أو الاعتراض على استخدامها عبر مراسلة [PRIVACY EMAIL]. وقد نطلب إثبات الهوية أولاً.",
      },
      {
        type: "paragraph",
        text: "قد يُحدَّث هذا الإشعار من وقت لآخر، والتاريخ الوارد في الأعلى يوضح النسخة الحالية.",
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
