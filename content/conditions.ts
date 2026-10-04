import { conditionItems } from "@/content/home";
import { pendingConditionScope, showPendingCopy } from "@/content/pending-copy";

export type ConditionKey = (typeof conditionItems)[number]["key"];
export type ConditionSlug = (typeof conditionItems)[number]["slug"];

/** Optional approved sections. Each renders only when its data exists. */
export type ConditionSectionsContent = Readonly<{
  symptoms?: string;
  arabicSymptoms?: string;
  urgentCare?: string;
  arabicUrgentCare?: string;
  treatment?: string;
  arabicTreatment?: string;
  afterTreatment?: string;
  arabicAfterTreatment?: string;
}>;

export type ConditionContent = Readonly<{
  key: ConditionKey;
  slug: ConditionSlug;
  source: string;
  description: string;
  arabicDescription: string;
  scope: readonly string[];
  arabicScope: readonly string[];
  /** Optional plain-language line under a procedure, aligned by index. */
  scopePlain?: ReadonlyArray<string | undefined>;
  arabicScopePlain?: ReadonlyArray<string | undefined>;
  /** Optional approved sections, collapsed to accordions on small screens. */
  sections?: ConditionSectionsContent;
  review?: string;
  emergency?: boolean;
}>;

const baseConditionContent = [
  {
    key: "brainAneurysm",
    slug: "brain-aneurysm",
    source: "CV §13",
    description: "A brain aneurysm is a weakened area in a blood vessel of the brain that can form a bulge. Evaluation and management depend on factors such as its location, size, shape, symptoms, and the individual clinical situation.",
    arabicDescription: "تمدد الأوعية الدموية الدماغية هو منطقة ضعيفة في أحد الأوعية الدموية في الدماغ قد تؤدي إلى تكوّن انتفاخ. يعتمد التقييم والتدبير على الموقع والحجم والشكل والأعراض والحالة السريرية الفردية.",
    scope: [
      "Coiling",
      "Balloon-assisted coiling",
      "Stent-assisted coiling",
      "Flow diverters",
      "Intrasaccular flow disruptors",
      "LEA",
      "Vessel sacrifice",
    ],
    arabicScope: [
      "العلاج باللفائف",
      "اللفائف بمساعدة البالون",
      "اللفائف بمساعدة الدعامة",
      "محولات تدفق الدم",
      "أجهزة تحويل التدفق داخل الكيس",
      "استخدام المواد الصمّية السائلة",
      "إغلاق الوعاء الدموي عند الحاجة",
    ],
    review: "The source records these procedure groups; patient-facing explanatory copy is not present in the source of truth.",
  },
  {
    key: "stroke",
    slug: "stroke",
    source: "CV §§13, 15",
    description: "Stroke is a serious neurological condition caused by interruption of blood flow to part of the brain or by bleeding in the brain. When stroke symptoms are acute, emergency medical assessment is required.",
    arabicDescription: "السكتة الدماغية حالة عصبية خطيرة تنتج عن انقطاع تدفق الدم إلى جزء من الدماغ أو عن نزيف داخل الدماغ. عند ظهور أعراض حادة، يلزم تقييم طبي طارئ.",
    scope: [
      "Acute stroke",
      "Mechanical thrombectomy using stent retrievers and aspiration",
      "Carotid stenting",
    ],
    arabicScope: [
      "استئصال الخثرة الميكانيكي باستخدام مسترجعات الدعامات والشفط",
      "تدعيم الشريان السباتي",
      "خبرة مسجلة مرتبطة بالتدخلات الوعائية الدماغية والسكتة الحادة",
    ],
    emergency: true,
    review: "The website is not an emergency service. The emergency branch must stop the normal consultation flow.",
  },
  {
    key: "avm",
    slug: "avm",
    source: "CV §13",
    description: "An arteriovenous malformation (AVM) is an abnormal connection between arteries and veins. Assessment and management depend on the individual anatomy and clinical circumstances.",
    arabicDescription: "التشوّه الشرياني الوريدي هو اتصال غير طبيعي بين الشرايين والأوردة. يعتمد التقييم والتدبير على تشريح الحالة والظروف السريرية الفردية.",
    scope: [
      "Endovascular treatment of bAVMs",
      "Arterial and venous embolisation",
      "Liquid embolic agents",
    ],
    arabicScope: [
      "العلاج داخل الأوعية للتشوّهات الشريانية الوريدية الدماغية",
      "الانصمام الشرياني والوريدي",
      "المواد الصمّية السائلة",
    ],
    review: "The source records these procedure groups; patient-facing explanatory copy is not present in the source of truth.",
  },
  {
    key: "carotidStenosis",
    slug: "carotid-stenosis",
    source: "CV §13",
    description: "Carotid stenosis refers to narrowing of a carotid artery that supplies blood to the brain. Assessment and management depend on the degree and cause of the narrowing and the individual's clinical situation.",
    arabicDescription: "تضيّق الشريان السباتي هو تضيق في أحد الشرايين السباتية التي تزوّد الدماغ بالدم. يعتمد التقييم والتدبير على درجة التضيق وسببه والحالة السريرية الفردية.",
    scope: [
      "Carotid stenting",
      "Angioplasty and stenting for extracranial atherosclerotic disease",
      "Angioplasty and stenting for intracranial atherosclerotic disease",
    ],
    arabicScope: [
      "تدعيم الشريان السباتي",
      "توسيع وتدعيم التضيق العصيدي خارج القحف",
      "توسيع وتدعيم التضيق العصيدي داخل القحف",
    ],
    review: "The source records these intervention groups; patient-facing explanatory copy is not present in the source of truth.",
  },
  {
    key: "venousSinusDisorders",
    slug: "venous-sinus-disorders",
    source: "CV §13",
    description: "Venous sinus disorders affect the venous channels that drain blood from the brain. Some conditions may be associated with raised intracranial pressure or pulsatile tinnitus and require specialist assessment.",
    arabicDescription: "تؤثر اضطرابات الجيوب الوريدية في القنوات الوريدية التي تصرّف الدم من الدماغ. وقد ترتبط بعض الحالات بارتفاع الضغط داخل القحف أو الطنين النابض وتحتاج إلى تقييم متخصص.",
    scope: [
      "Treatment of spontaneous intracranial hypertension via venous sinus stenting",
      "Treatment of pulsatile tinnitus via venous sinus stenting",
    ],
    arabicScope: [
      "تدعيم الجيوب الوريدية في حالات فرط الضغط داخل القحف مجهول السبب",
      "تدعيم الجيوب الوريدية في سياق الطنين النابض",
    ],
    review: "The source records these procedure groups; diagnosis and treatment guidance are not provided in the source of truth.",
  },
  {
    key: "chronicSubduralHaematoma",
    slug: "chronic-subdural-haematoma",
    source: "CV §13",
    description: "Chronic subdural haematoma is a collection of blood that develops over time between the brain and its outer covering. Assessment and management depend on the individual's symptoms, imaging findings, and overall clinical situation.",
    arabicDescription: "التجمع الدموي المزمن تحت الجافية هو تجمع للدم يتطور مع الوقت بين الدماغ وغلافه الخارجي. يعتمد التقييم والتدبير على الأعراض ونتائج التصوير والحالة السريرية العامة للفرد.",
    scope: ["Treatment of chronic subdural haematomas"],
    arabicScope: ["علاج التجمعات الدموية المزمنة تحت الجافية"],
    review: "The source records this clinical expertise; patient-facing explanatory copy is not present in the source of truth.",
  },
] satisfies readonly ConditionContent[];

/**
 * Approved content. Section 5's proposed English procedure labels are
 * applied only when SHOW_PENDING_COPY=1, and never in production builds.
 */
export const conditionContent: readonly ConditionContent[] = showPendingCopy
  ? baseConditionContent.map((condition) => {
      const scope = pendingConditionScope[condition.slug];
      return scope ? { ...condition, scope } : condition;
    })
  : baseConditionContent;

export function getConditionContent(slug: string) {
  return conditionContent.find((condition) => condition.slug === slug);
}
