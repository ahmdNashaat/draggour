import type { Locale } from "@/content/site";
import { pendingBiographyIntro, showPendingCopy } from "@/content/pending-copy";

export type BiographyItem = Readonly<{
  title: string;
  /** Displayed value: a date range, a figure, a short clarification or a URL. */
  detail?: string;
  /** Internal governance note. Never rendered on the website. */
  review?: string;
  /** Internal-only row: kept for completeness but not rendered publicly. */
  internalOnly?: boolean;
}>;

export type BiographyContent = Readonly<{
  overview: Readonly<{
    source: string;
    keyFacts: readonly string[];
    paragraphs: readonly string[];
    review?: string;
  }>;
  currentPositions: readonly BiographyItem[];
  careerHistory: readonly BiographyItem[];
  previousPositions: readonly BiographyItem[];
  qualifications: readonly string[];
  societies: readonly string[];
  teaching: readonly BiographyItem[];
  academic: readonly BiographyItem[];
  research: readonly BiographyItem[];
  leadership: readonly BiographyItem[];
  milestones: readonly BiographyItem[];
  clinicalExpertise: readonly BiographyItem[];
  annualActivity: readonly BiographyItem[];
  externalLinks: readonly BiographyItem[];
}>;

/**
 * English Biography content — complete factual material extracted from
 * `content/source-of-truth.md` §§1–16. Approval, verification and conflict
 * notes live in `review` / `source` and are internal metadata only.
 */
export const biographyContent: BiographyContent = {
  overview: {
    source: "CV §§2, 13, 15",
    keyFacts: [
      "Consultant Interventional Neuroradiologist",
      "More than nineteen years of experience in minimally invasive endovascular neuroradiology",
      "Practices in London (St George’s University Hospitals) and Belgium (CHC MontLégia)",
      "Specializes in cerebral aneurysms, AVMs, and acute stroke",
    ],
    paragraphs: [
      showPendingCopy
        ? pendingBiographyIntro.en
        : "Dr. Mohamed Aggour is a Consultant Interventional Neuroradiologist with more than nineteen years of experience in minimally invasive endovascular neuroradiology, engaged in the treatment and management of brain and spinal vascular diseases.",
      "His work covers cerebral aneurysms, brain and spinal arteriovenous malformations, intracranial stenosis and acute stroke — from diagnosis, decision-making and therapeutic strategy through to treatment and follow-up.",
      "After leading the interventional neuroradiology activity at Saint Etienne University Hospitals for nine years, and at Lille University Hospitals for three years, he moved to The Royal London Hospital — Barts NHS Trust, developing with the existing team the interventional neuroradiology activity in Barts NHS Trust, serving Londoners and beyond.",
      "The 24/7 stroke mechanical thrombectomy service serves more than 250 patients each year from London and surrounding areas. Drawing on his experience in organising regional and national management of subarachnoid haemorrhage and stroke networks in France, he works with the interventional neuroradiology team at The Royal London Hospital to develop the service and optimise patients’ care and management.",
      "He promotes medical education and training in interventional neuroradiology with national and international universities and organisations, and is an active member of the French Society of Neuroradiology and British groups.",
      "He is also keen to develop interventional neuroradiology in Africa and the Middle East through his position on the board of the PAIRS society.",
    ],
    review: "CF4/Q1 preserved: the source figure is “more than nineteen years”. Title and tense remain for the doctor’s review.",
  },
  currentPositions: [
    { title: "Consultant Interventional Neuroradiologist — St George’s University Hospitals, London, UK" },
    { title: "Consultant Interventional Neuroradiologist — CHC MontLégia, Liège, Belgium" },
    {
      title: "Board member and Committee chair — ESMINT",
      review: "CF1 preserved: the positions section appears current, while other CV sections record Board Member and Chairman of the Publication Executive Committee for 2017–2023.",
    },
    { title: "Lecturer, Oxford University — ECMINT Course" },
    {
      title: "Ex. Board Member, Co-Chair INR — PAIRS Neuro MEA",
      review: "CF2 preserved: the CV also records Program Director 2017–2024 and President 2018–present.",
    },
    { title: "President — Fondation Brain Safe de l’AVC (Brain Safe Foundation for Cerebrovascular Stroke)" },
    {
      title: "Program Director, PAIRS Neuro Congress (2017–2024), Dubai",
      review: "CF2 preserved: Program Director 2017–2024 versus President 2018–present.",
    },
  ],
  careerHistory: [
    { title: "Assistant Fellow, Radiology Department, Ain Shams University, Cairo, Egypt", detail: "2002–2006" },
    { title: "Fellow, Radiology Department, Reims University, Reims, France", detail: "2006–2009" },
    { title: "Head of INR, Department of Neuroradiology, Lille University Hospitals, Lille, France", detail: "2009–2012" },
    {
      title: "Head of INR unit and regional Lead Consultant, Saint Etienne University Hospitals, Saint Etienne, France",
      detail: "2012–2019",
    },
    {
      title: "INR Consultant, Training & Education Lead, The Royal London Hospital, London, UK",
      detail: "2020–2022",
      review: "CF3 preserved: the dated position is shown as historical while the present-tense biography wording remains unresolved.",
    },
  ],
  previousPositions: [
    { title: "Associate Editor, Journal of Neuroradiology, SFNR", detail: "6 years" },
    { title: "President, ESMINT Annual Congress, Nice, France", detail: "2022" },
    { title: "Vice President, ESMINT Annual Congress, Marseille, France", detail: "2023" },
    { title: "Chairman, Publication Executive Committee, ESMINT", detail: "2017–2023" },
    { title: "Board Member, ESMINT", detail: "2017–2023" },
    {
      title: "President, PAIRS Neuro MEA Annual Congress, Dubai, UAE",
      detail: "2018–present",
      review: "CF2 preserved: Program Director 2017–2024 versus President 2018–present.",
    },
  ],
  qualifications: [
    "Bachelor of Surgery and Medicine, Ain Shams University, Cairo, Egypt",
    "Master of Radiodiagnosis, Ain Shams University, Cairo, Egypt",
    "M.D. of Radiodiagnosis, Egypt",
    "French Board of Imaging & Diagnostic Radiology (PAE)",
    "AFS Diploma & Clinical Training, Radiology / Neuroradiology, Reims University Hospitals, Reims, France",
    "AFSA Diploma & Clinical Training, Interventional Neuroradiology, Lille University Hospitals, Lille, France",
    "Diploma of Diagnostic and Therapeutic Neurovascular Diseases, Université Paris Descartes (Paris V), Paris, France",
    "Diploma of Neuroradiology, Université Pierre et Marie Curie (Sorbonne — Paris VI), Paris, France",
    "European Diploma of Neuroradiology, European Society of Neuroradiology (ESNR)",
    "European Diploma of Higher Qualification in Interventional Neuroradiology, ESNR",
    "European Fellow in Interventional Neuroradiology (ESNR)",
    "Fellow of EBNI (European Board of Neurointerventionists)",
  ],
  societies: [
    "French Society of Neuroradiology (SFNR)",
    "European Society of Minimally Invasive Neurological Therapies (ESMINT)",
    "European Society of Neuroradiology (ESNR)",
    "Pan-Arab Interventional Radiology Society (PAIRS)",
    "United Kingdom Neuroradiology Group (UKNG)",
  ],
  teaching: [
    { title: "ECMINT course, Oxford (ESMINT course)", detail: "The prestigious course of the ESMINT society." },
    { title: "United Kingdom Neuroradiology Group courses" },
    {
      title:
        "Organised meetings and courses: PAIRS INR, MoMo-MEA (Dubai), ICE-DINR (Egypt), Zagreb Course (Croatia) and Technicians in INR day (Francophone, France)",
    },
    { title: "PAIRS Neuro Annual Congress — programme and workshops", review: "CF2 preserved: PAIRS role and currentness remain unresolved." },
    { title: "Tutor / trainer for senior and junior colleagues and technicians, in France and worldwide" },
    { title: "Proctor and tutor for complex cases, worldwide" },
    {
      title: "Industry workshop tutoring: Medtronic, Cerenovus, Microvention and Balt",
      review: "T3 / Q7: company names require explicit approval before publication.",
    },
    { title: "International Key Opinion Leader in INR", review: "T3 / Q6: explicit approval is required before publication." },
  ],
  academic: [
    {
      title: "Reviewer for high-ranked European and American neuroradiology journals, including JNIS and JNR",
      review: "Current editorial status requires verification.",
    },
    {
      title:
        "Associate Editor, member of the scientific committee and reviewer, Journal of Neuroradiology (since 2009); European Journal of Radiology; Journal of Neurointerventional Surgery",
      review: "Also recorded as Associate Editor for 6 years; current role requires verification.",
    },
    { title: "Regular invited speaker, faculty member and lecturer at international INR meetings and events" },
    {
      title: "Interest in new INR device innovation and development, in close collaboration with R&D engineers",
    },
  ],
  research: [
    { title: "Research fields: perfusion endovascular studies, clot models, cerebral ischaemia and neuroprotection" },
    {
      title:
        "Research with Hospices Civils de Lyon, CREATIS and Carmen — an endovascular, reversible stroke model in non-human primates mimicking stroke and mechanical thrombectomy",
    },
    {
      title:
        "Study participation: ESAT, ARETA, TRAIL, THRACE, VOLCAN, DIVERSION, EVIDENCE, REACT, SAFE, HENRI, CHOICE, TENSION, INSPIRE, SWIFT DIRECT, IN EXTRMIS, ACET and Minor-Stroke",
      review: "Source requires an approved curated list rather than an unreviewed acronym list.",
    },
    { title: "PI in various multicentric studies and advisory boards", review: "T3 / Q12: explicit approval is required before publication." },
    { title: "PubMed listing", detail: "https://pubmed.ncbi.nlm.nih.gov/?term=Aggour+M&cauthor_id=32303584" },
  ],
  leadership: [
    {
      title: "Elected Board Member and Chair of the Publication Executive Committee, ESMINT (2017)",
      review: "CF1 preserved: current status versus completed in 2023.",
    },
    { title: "Developed collaboration between ESMINT and SNIS / JNIS" },
    { title: "Established the Best European Publication in JNIS award" },
    { title: "Wrote ESMINT guidelines for neuro-interventional procedures during the Covid-19 epidemic" },
    { title: "Developing interventional neuroradiology in Africa and the Middle East through PAIRS" },
    {
      title: "PAIRS Neuro MEA — largest Neurovascular Society and Congress in the MEA region",
      review: "T3 / Q2: superlative requires explicit approval.",
    },
  ],
  milestones: [
    {
      title:
        "ESMINT 2022 congress: live translation including Mandarin, Start-Up Alley, R&D interactive sessions, morning run and beach yoga",
      review: "T3 / Q13: explicit approval is required before publication.",
    },
    {
      title: "24/7 stroke mechanical thrombectomy service serving more than 250 patients per year",
      review: "T3 / Q9: currentness and publication require explicit approval.",
    },
    { title: "Organised regional and national management of subarachnoid haemorrhage and stroke networks in France" },
    {
      title: "PAIRS Neuro annual meeting, held annually in Dubai",
      detail:
        "A renowned world-class scientific international meeting, attended from beyond the Middle East region to the Far East, Africa and Eastern Europe, and described among the most prestigious international congresses.",
      review: "T3 / Q3 and Q4: superlatives require explicit approval.",
    },
  ],
  clinicalExpertise: [
    {
      title: "Neurovascular care",
      detail:
        "Diagnosis, decision-making, therapeutic strategy and follow-up for all neurovascular diseases; multidisciplinary decision-making with neurosurgery, neurology, radiosurgery, intensive care, anaesthetics and emergency teams.",
    },
    {
      title: "Angiography and access",
      detail: "Cerebral and spinal angiography; arterial and venous access including radial and direct neck punctures.",
    },
    {
      title: "Brain aneurysms",
      detail:
        "Coiling, balloon-assisted coiling, stent-assisted coiling, flow diverters, intrasaccular flow disruptors, LEA and vessel sacrifice.",
    },
    {
      title: "Brain and spinal arteriovenous malformations",
      detail: "Endovascular treatment of bAVMs, including arterial and venous embolisation and liquid embolic agents.",
    },
    {
      title: "Other embolisation and fistulas",
      detail:
        "Microparticle embolisation for epistaxis, tumour embolisation and trauma; embolisation of brain and spinal fistulas including dural, carotid-cavernous and traumatic fistulas.",
    },
    { title: "Chronic subdural haematomas", detail: "Treatment of chronic subdural haematomas." },
    {
      title: "Venous sinus disorders",
      detail: "Treatment of spontaneous intracranial hypertension and pulsatile tinnitus via venous sinus stenting.",
    },
    {
      title: "Stroke and stenosis interventions",
      detail:
        "Mechanical thrombectomy using stent retrievers and aspiration, carotid stenting, and angioplasty and stenting for extracranial and intracranial atherosclerotic disease.",
    },
    { title: "Paediatric interventions", detail: "Paediatric interventions including vein of Galen embolisation." },
    {
      title: "Comprehensive neurointerventional scope",
      detail: "All neurointerventional vascular procedures, in adults and paediatric patients.",
      review: "T3 / Q10: claim requires explicit approval.",
    },
  ],
  annualActivity: [
    { title: "Endovascular treatment of intracranial aneurysms", detail: "150–200 / year" },
    { title: "Endovascular treatment of brain and spinal AVMs", detail: "40–50 / year" },
    { title: "Mechanical thrombectomy for stroke", detail: "90–150 / year" },
    { title: "Other intracranial embolisations", detail: "20–30 / year" },
    { title: "Paediatric embolisations", detail: "5–8 / year" },
    { title: "Diagnostic cerebral angiographies", detail: "250–350 / year" },
    { title: "Consultations", detail: "200–250 / year" },
    { title: "Follow-up MRI for treated patients", detail: "250–350 / year" },
  ],
  externalLinks: [
    { title: "LinkedIn", detail: "https://www.linkedin.com/in/mohamed-aggour-1414a941" },
    { title: "PubMed", detail: "https://pubmed.ncbi.nlm.nih.gov/?term=Aggour+M&cauthor_id=32303584", review: "Keep as a research-results link only; this author-filtered result page is not a canonical person profile.", internalOnly: true },
    { title: "Twitter / X", detail: "@Aggour", review: "Handle recorded in the CV; no matching public account has been verified.", internalOnly: true },
    {
      title: "Official YouTube channel",
      detail: "No official channel URL is recorded.",
      review: "Controlled placeholder; do not invent a URL.",
      internalOnly: true,
    },
    {
      title: "Institutional and organisation profiles",
      detail: "No approved URLs are recorded.",
      review: "Controlled placeholder; do not invent URLs.",
      internalOnly: true,
    },
  ],
};

/**
 * Arabic Biography content — the same source-derived facts, translated for the
 * Arabic prototype. No fact is added that is absent from the English source
 * material above.
 */
export const biographyContentArabic: BiographyContent = {
  overview: {
    source: "CV §§2, 13, 15",
    keyFacts: [
      "استشاري الأشعة العصبية التداخلية",
      "خبرة تزيد على تسعة عشر عاماً في الأشعة التداخلية داخل الأوعية",
      "يمارس عمله في لندن (مستشفيات جامعة سانت جورج) وبلجيكا (CHC MontLégia)",
      "متخصص في تمدد الأوعية الدموية الدماغية والتشوهات الشريانية الوريدية والسكتة الدماغية الحادة",
    ],
    paragraphs: [
      showPendingCopy
        ? pendingBiographyIntro.ar
        : "الدكتور محمد عجور استشاري في الأشعة العصبية التداخلية، ذو خبرة تزيد على تسعة عشر عاماً في الأشعة التداخلية داخل الأوعية المنخفضة الغاز، مُكرَّس لعلاج وأمراض الأوعية الدموية الدماغية والشوكية.",
      "تشمل أعماله تمدد الأوعية الدموية في الدماغ، والتشوهات الشريانية الوريدية الدماغية والشوكية، وتضيق الأوعية داخل القحف، والسكتة الدماغية الحادة — من التشخيص واتخاذ القرار والاستراتيجية العلاجية حتى العلاج والمتابعة.",
      "بعد توليه نشاط الأشعة العصبية التداخلية في مستشفيات سانت إتيان الجامعية لمدة تسع سنوات، وفي مستشفيات ليل الجامعية لمدة ثلاث سنوات، انتقل إلى مستشفى رويال لندن — Barts NHS Trust، حيث طوّر مع الفريق القائم نشاط الأشعة العصبية التداخلية في منظومة Barts NHS Trust، في خدمة سكان لندن وما حولها.",
      "تخدم خدمة استخلاص الجلطة الميكانيكي على مدار الساعة للسكتة الدماغية أكثر من 250 مريضاً سنوياً من لندن والمناطق المجاورة. وبالاستناد إلى خبرته في تنظيم الشبكات الإقليمية والوطنية لإدارة النزف تحت العنكبوتية والسكتة الدماغية في فرنسا، يعمل مع فريق الأشعة العصبية التداخلية في مستشفى رويال لندن على تطوير هذه الخدمة وتحسين رعاية المرضى وإدارتهم.",
      "يعمل على تعزيز التعليم الطبي والتدريب في الأشعة العصبية التداخلية مع جامعات ومؤسسات وطنية ودولية، وهو عضو نشط في الجمعية الفرنسية للأعصاب الإشعاعية وفي الجمعيات البريطانية.",
      "إلى جانب اهتمامه بتطوير الأشعة العصبية التداخلية في أفريقيا والشرق الأوسط من خلال منصبه في مجلس إدارة جمعية PAIRS.",
    ],
    review: "CF4/Q1 preserved: the source figure is “more than nineteen years”. Title and tense remain for the doctor’s review.",
  },
  currentPositions: [
    { title: "استشاري الأشعة العصبية التداخلية — مستشفى سانت جورج الجامعي، لندن، المملكة المتحدة" },
    { title: "استشاري الأشعة العصبية التداخلية — CHC MontLégia، لييج، بلجيكا" },
    {
      title: "عضو في مجلس إدارة ESMINT ورئيس للجنة",
      review: "CF1 preserved: the positions section appears current, while other CV sections record Board Member and Chairman of the Publication Executive Committee for 2017–2023.",
    },
    { title: "محاضر في جامعة أكسفورد — دورة ECMINT" },
    {
      title: "عضو سابق في مجلس الإدارة ورئيس مشترك للأشعة العصبية التداخلية — PAIRS Neuro MEA",
      review: "CF2 preserved: the CV also records Program Director 2017–2024 and President 2018–present.",
    },
    { title: "رئيس مؤسسة Brain Safe لسكتة الدماغية الوعائية (Brain Safe Foundation for Cerebrovascular Stroke)" },
    {
      title: "مدير البرنامج، مؤتمر PAIRS Neuro (2017–2024)، دبي",
      review: "CF2 preserved: Program Director 2017–2024 versus President 2018–present.",
    },
  ],
  careerHistory: [
    { title: "مساعد زميل، قسم الأشعة، جامعة عين شمس، القاهرة، مصر", detail: "2002–2006" },
    { title: "زميل، قسم الأشعة، جامعة رانس، رانس، فرنسا", detail: "2006–2009" },
    { title: "رئيس الأشعة العصبية التداخلية، قسم الأعصاب الإشعاعية، مستشفيات ليل الجامعية، ليل، فرنسا", detail: "2009–2012" },
    {
      title: "رئيس وحدة الأشعة العصبية التداخلية ومستشار إقليمي رئيسي، مستشفيات سانت إتيان الجامعية، سانت إتيان، فرنسا",
      detail: "2012–2019",
    },
    {
      title: "استشاري الأشعة العصبية التداخلية وقائد التدريس والتعليم، مستشفى رويال لندن، لندن، المملكة المتحدة",
      detail: "2020–2022",
      review: "CF3 preserved: the dated position is shown as historical while the present-tense biography wording remains unresolved.",
    },
  ],
  previousPositions: [
    { title: "محرر مساعد، صحيفة الأشعة العصبية (Journal of Neuroradiology)، SFNR", detail: "6 سنوات" },
    { title: "رئيس مؤتمر ESMINT السنوي، نيس، فرنسا", detail: "2022" },
    { title: "نائب رئيس مؤتمر ESMINT السنوي، مارسيليا، فرنسا", detail: "2023" },
    { title: "رئيس اللجنة التنفيذية للنشر، ESMINT", detail: "2017–2023" },
    { title: "عضو مجلس إدارة ESMINT", detail: "2017–2023" },
    {
      title: "رئيس مؤتمر PAIRS Neuro MEA السنوي، دبي، الإمارات العربية المتحدة",
      detail: "2018 – حتى الآن",
      review: "CF2 preserved: Program Director 2017–2024 versus President 2018–present.",
    },
  ],
  qualifications: [
    "بكالوريوس الجراحة والطب، جامعة عين شمس، القاهرة، مصر",
    "ماجستير الأشعة التشخيصية، جامعة عين شمس، القاهرة، مصر",
    "دكتوراه في الأشعة التشخيصية، مصر",
    "البورد الفرنسي في التصوير والأشعة التشخيصية (PAE)",
    "دبلومة AFS والتدريب السريري، الأشعة والأعصاب الإشعاعية، مستشفيات رانس الجامعية، رانس، فرنسا",
    "دبلومة AFSA والتدريب السريري، الأشعة العصبية التداخلية، مستشفيات ليل الجامعية، ليل، فرنسا",
    "دبلومة أمراض الأوعية العصبية التشخيصية والعلاجية، جامعة باريس ديكارت (باريس 5)، باريس، فرنسا",
    "دبلومة الأعصاب الإشعاعية، جامعة بيير وماري كوري (سوربون — باريس 6)، باريس، فرنسا",
    "الدبلومة الأوروبية في الأعصاب الإشعاعية، الجمعية الأوروبية للأعصاب الإشعاعية (ESNR)",
    "الدبلومة الأوروبية ذات المستوى العالي في الأشعة العصبية التداخلية، ESNR",
    "زمالة الأشعة العصبية التداخلية الأوروبية (ESNR)",
    "زمالة المجلس الأوروبي لمتخصصي التداخل العصبي (EBNI)",
  ],
  societies: [
    "الجمعية الفرنسية للأعصاب الإشعاعية (SFNR)",
    "الجمعية الأوروبية للعلاجات العصبية المنخفضة الغاز (ESMINT)",
    "الجمعية الأوروبية للأعصاب الإشعاعية (ESNR)",
    "الجمعية الفرا عربية للأشعة التداخلية (PAIRS)",
    "مجموعة الأشعة العصبية بالمملكة المتحدة (UKNG)",
  ],
  teaching: [
    { title: "دورة ECMINT في أكسفورد (دورة ESMINT)", detail: "الدورة المرموقة لجمعية ESMINT." },
    { title: "دورات مجموعة الأشعة العصبية بالمملكة المتحدة (UKNG)" },
    {
      title:
        "اجتماعات ودورات منظمة: PAIRS INR، وMoMo-MEA (دبي)، وICE-DINR (مصر)، وZagreb Course (كرواتيا)، ويوم تقنيي الأشعة العصبية التداخلية (الناطقة بالفرنسية، فرنسا)",
    },
    { title: "الكونغرس السنوي لـ PAIRS Neuro — البرنامج وورش العمل", review: "CF2 preserved: PAIRS role and currentness remain unresolved." },
    { title: "تدريب ومرافقة الزملاء والتقنيين من مختلف المستويات، في فرنسا وحول العالم" },
    { title: "إشراف وتدريب على الحالات المعقدة، حول العالم" },
    {
      title: "تدريب في ورش العمل الصناعية: Medtronic وCerenovus وMicrovention وBalt",
      review: "T3 / Q7: company names require explicit approval before publication.",
    },
    { title: "قائد رأي مفتاحي دولي في الأشعة العصبية التداخلية", review: "T3 / Q6: explicit approval is required before publication." },
  ],
  academic: [
    {
      title: "محرر ومراجع في مجلات الأعصاب الإشعاعية الأوروبية والأمريكية المرموقة، منها JNIS وJNR",
      review: "Current editorial status requires verification.",
    },
    {
      title:
        "محرر مساعد وعضو في اللجنة العلمية ومحرر مراجع في Journal of Neuroradiology (منذ 2009)، وكذلك European Journal of Radiology وJournal of Neurointerventional Surgery",
      review: "Also recorded as Associate Editor for 6 years; current role requires verification.",
    },
    { title: "متحدث وعضو هيئة تدريس ومحاضر منتظم في الاجتماعات والفعاليات الدولية للأشعة العصبية التداخلية" },
    { title: "اهتمام بابتكار وتطوير أجهزة الأشعة العصبية التداخلية الجديدة بالتعاون مع مهندسي البحث والتطوير" },
  ],
  research: [
    { title: "مجالات البحث: دراسات التصريف الدماغي التداخلية، ونماذج الجلطات، ونقص التروية الدماغية، والحماية العصبية" },
    {
      title:
        "بحث بالتعاون مع Hospices Civils de Lyon وCREATIS وCarmen — نموذج سكتة دماغية تداخلية وقابل للعكس في غير البشر، يحاكي السكتة الدماغية واستخلاص الجلطة الميكانيكي",
    },
    {
      title:
        "المشاركة في الدراسات: ESAT، وARETA، وTRAIL، وTHRACE، وVOLCAN، وDIVERSION، وEVIDENCE، وREACT، وSAFE، وHENRI، وCHOICE، وTENSION، وINSPIRE، وSWIFT DIRECT، وIN EXTRMIS، وACET، وMinor-Stroke",
      review: "Source requires an approved curated list rather than an unreviewed acronym list.",
    },
    { title: "باحث رئيسي في العديد من الدراسات متعددة المراكز وفرق المشورة", review: "T3 / Q12: explicit approval is required before publication." },
    { title: "قائمة PubMed", detail: "https://pubmed.ncbi.nlm.nih.gov/?term=Aggour+M&cauthor_id=32303584" },
  ],
  leadership: [
    {
      title: "عضو منتخب في مجلس الإدارة ورئيس اللجنة التنفيذية للنشر، ESMINT (2017)",
      review: "CF1 preserved: current status versus completed in 2023.",
    },
    { title: "تطوير تعاون بين ESMINT وSNIS / JNIS" },
    { title: "إنشاء جائزة أفضل بحث أوروبي في صحيفة JNIS" },
    { title: "تحرير إرشادات ESMINT للإجراءات التداخلية العصبية خلال جائحة Covid-19" },
    { title: "تطوير الأشعة العصبية التداخلية في أفريقيا والشرق الأوسط من خلال PAIRS" },
    {
      title: "PAIRS Neuro MEA — أكبر جمعية وكونغرس للأمراض العصبية الوعائية في منطقة الشرق الأوسط وإفريقيا",
      review: "T3 / Q2: superlative requires explicit approval.",
    },
  ],
  milestones: [
    {
      title:
        "مؤتمر ESMINT 2022: ترجمة مباشرة تشمل اللغة الصينية، وStart-Up Alley، وجلسات تفاعلية للبحث والتطوير، وجري الصباح ويوغا الشاطئ",
      review: "T3 / Q13: explicit approval is required before publication.",
    },
    {
      title: "خدمة استخلاص الجلطة الميكانيكي على مدار الساعة للسكتة الدماغية، والتي تخدم أكثر من 250 مريضاً سنوياً",
      review: "T3 / Q9: currentness and publication require explicit approval.",
    },
    { title: "تنظيم شبكات إقليمية ووطنية لإدارة النزف تحت العنكبوتية والسكتة الدماغية في فرنسا" },
    {
      title: "الكونغرس السنوي لـ PAIRS Neuro، المقعد سنوياً في دبي",
      detail:
        "لقاء علمي دولي مرموق يُعد من أشهر المؤتمرات الدولية، ويحضره مشاركون من خارج منطقة الشرق الأوسط وصولاً إلى شرق آسيا وإفريقيا وأوروبا الشرقية.",
      review: "T3 / Q3 and Q4: superlatives require explicit approval.",
    },
  ],
  clinicalExpertise: [
    {
      title: "رعاية الأمراض العصبية الوعائية",
      detail:
        "التشخيص واتخاذ القرار والاستراتيجية العلاجية والمتابعة لجميع أمراض الأوعية العصبية؛ واتخاذ قرار متعدد التخصصات مع جراحات الأعصاب والطب العصبي والجراحة الإشعاعية والعناية المركزة والتخدير وخدمات الطوارئ.",
    },
    {
      title: "التصوير القسطري والوصول الوعائي",
      detail: "التصوير القسطري الدماغي والشوكي؛ والوصول الشرياني والوريدي بما في ذلك الوصول السعفي وخزع الرقبة المباشر.",
    },
    {
      title: "تمددات شرايين الدماغ",
      detail:
        "العلاج بالملفات، والعلاج بالملفات بمساعدة البالون، والعلاج بالملفات بمساعدة الدعامة، والموجهات التدفقية، والمتقطعات التدفقية داخل الانتفاخ، وLEA، والتضحية بالوعاء.",
    },
    {
      title: "التشوهات الشريانية الوريدية الدماغية والشوكية",
      detail: "العلاج التدخلي للتشوهات الشريانية الوريدية، بما في ذلك التحبيس الشرياني والوريدي والعوامل المبيّضة السائلة.",
    },
    {
      title: "تحبيسات أخرى وناسور الأوعية",
      detail:
        "تحبيس بالجسيمات الدقيقة لعلاج نزيف الأنف، وتحبيس الأورام، والرضوح؛ وتحبيس ناسور الدماغ والشوكية، بما في ذلك الناسور الأم الجافية، والسباتي الكهفي، والرضحي.",
    },
    { title: "التجمع الدموي المزمن تحت الجافية", detail: "علاج التجمع الدموي المزمن تحت الجافية." },
    {
      title: "اضطرابات الجيوب الوريدية",
      detail: "علاج ارتفاع الضغط داخل القحف التلقائي وطنين النبض عبر توسيع الجيوب الوريدية.",
    },
    {
      title: "تدخّلات السكتة الدماغية وتضيق الأوعية",
      detail:
        "استخلاص الجلطة الميكانيكي عبر الماسكات الشبكية والشفط، وتركيب الدعامة السباتية، والتوسيع والتركيب للمرض الشرياني تصلبي داخل القحف وخارجه.",
    },
    { title: "تدخّلات الأطفال", detail: "تدخّلات في الأطفال، بما في ذلك تحبيس وريد جالن." },
    {
      title: "نطاق تدخّلات عصبية وعائية شامل",
      detail: "جميع إجراءات التداخل العصبي الوعائي عند البالغين وعند الأطفال.",
      review: "T3 / Q10: claim requires explicit approval.",
    },
  ],
  annualActivity: [
    { title: "العلاج التدخلي للتمددات الشريانية داخل القحف", detail: "150–200 / سنة" },
    { title: "العلاج التدخلي للتشوهات الشريانية الوريدية الدماغية والشوكية", detail: "40–50 / سنة" },
    { title: "استخلاص الجلطة الميكانيكي للسكتة الدماغية", detail: "90–150 / سنة" },
    { title: "تحبيسات داخل قحفية أخرى", detail: "20–30 / سنة" },
    { title: "تحبيسات الأطفال", detail: "5–8 / سنة" },
    { title: "التصوير التشخيصي بالقسطرة الدماغية", detail: "250–350 / سنة" },
    { title: "الاستشارات", detail: "200–250 / سنة" },
    { title: "التصوير بالرنين المغناطيسي لمتابعة المرضى بعد العلاج", detail: "250–350 / سنة" },
  ],
  externalLinks: [
    { title: "LinkedIn", detail: "https://www.linkedin.com/in/mohamed-aggour-1414a941" },
    { title: "PubMed", detail: "https://pubmed.ncbi.nlm.nih.gov/?term=Aggour+M&cauthor_id=32303584", review: "Keep as a research-results link only; this author-filtered result page is not a canonical person profile.", internalOnly: true },
    { title: "إكس (Twitter)", detail: "@Aggour", review: "Handle recorded in the CV; no matching public account has been verified.", internalOnly: true },
    {
      title: "قناة YouTube الرسمية",
      detail: "لا توجد رابط مسجل.",
      review: "Controlled placeholder; do not invent a URL.",
      internalOnly: true,
    },
    {
      title: "الملفات المهنية والمؤسسية",
      detail: "لا توجد روابط معتمدة مسجلة.",
      review: "Controlled placeholder; do not invent URLs.",
      internalOnly: true,
    },
  ],
};

export function getBiographyContent(locale: Locale): BiographyContent {
  return locale === "ar" ? biographyContentArabic : biographyContent;
}
