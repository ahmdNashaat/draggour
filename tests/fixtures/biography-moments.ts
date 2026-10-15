import type { BiographyMoment, BiographyMoments } from "../../content/biography";
import type { Locale } from "../../content/site";

/**
 * Test-only gallery fixtures. They live under tests/, never in
 * content/biography.ts, so no published page can pick them up by accident.
 *
 * Every entry points at a file that already exists under public/ — the same
 * portrait, cropped at a different `focus` point per moment — so the layout,
 * the crop and the caption stack are exercised without publishing a photo the
 * doctor has not approved. The section titles are the proposed wording and
 * still need the doctor's approval before they go near the real content.
 */
export const fixtureCounts = [3, 4, 5, 6] as const;

export type FixtureCount = (typeof fixtureCounts)[number];

const PORTRAIT = { src: "/images/doctor/dr-mohamed-aggour.png", width: 1024, height: 1536 } as const;

const titles: Readonly<Record<"en" | "ar", string>> = {
  en: "Moments from practice and teaching",
  ar: "من الممارسة والتدريس",
};

const intros: Readonly<Record<"en" | "ar", string>> = {
  en: "Photographs from clinical work, teaching and the specialty's meetings, with the place, the year and the occasion named under each one.",
  ar: "صور من العمل السريري والتدريس واجتماعات التخصص، مع ذكر المكان والسنة والمناسبة تحت كل صورة.",
};

type FixtureEntry = Readonly<{
  focus: Readonly<{ x: number; y: number }>;
  en: Readonly<{ alt: string; meta: string; caption: string }>;
  ar: Readonly<{ alt: string; meta: string; caption: string }>;
}>;

const entries: readonly FixtureEntry[] = [
  {
    focus: { x: 50, y: 28 },
    en: {
      alt: "Dr. Mohamed Aggour beside the imaging control panel in an angiography suite",
      meta: "London · 2024 · Stroke unit teaching",
      caption:
        "A teaching moment in the angiography suite at The Royal London Hospital, walking the interventional team through the catheter position on the screen before a mechanical thrombectomy case.",
    },
    ar: {
      alt: "الدكتور محمد عجور بجوار لوحة التحكم بالتصوير في غرفة القسطرة",
      meta: "لندن · 2024 · تدريب وحدة السكتة الدماغية",
      caption:
        "لحظة تدريب في غرفة القسطرة بمستشفى رويال لندن، يشرح لفريق التداخل موضع القسطرة على الشاشة قبل حالة استخلاص الجلطة الميكانيكي.",
    },
  },
  {
    focus: { x: 45, y: 32 },
    en: {
      alt: "Dr. Mohamed Aggour lecturing to a room of physicians on a neuroradiology course",
      meta: "Oxford · 2023 · ECMINT course",
      caption:
        "Opening the ECMINT course at Oxford, where interventional neuroradiology fellows spend a week on case planning, vessel anatomy and the decisions that come before the first catheter is placed.",
    },
    ar: {
      alt: "الدكتور محمد عجور يحاضر أمام مجموعة من الأطباء في دورة للأشعة العصبية",
      meta: "أكسفورد · 2023 · دورة ECMINT",
      caption:
        "في افتتاح دورة ECMINT بأكسفورد، حيث يقضي زملاء الأشعة العصبية التداخلية أسبوعًا في تخطيط الحالات وتشريح الأوعية والقرارات التي تسبق أول قسطرة.",
    },
  },
  {
    focus: { x: 52, y: 30 },
    en: {
      alt: "Dr. Mohamed Aggour speaking from a lectern at a neurovascular congress",
      meta: "Dubai · 2024 · PAIRS Neuro congress",
      caption:
        "Introducing a PAIRS Neuro session in Dubai, one of the meetings where the society brings faculty from Africa and the Middle East together to build the specialty region by region.",
    },
    ar: {
      alt: "الدكتور محمد عجور يتحدث من منصة في مؤتمر عصبي وعائي",
      meta: "دبي · 2024 · مؤتمر PAIRS Neuro",
      caption:
        "تقديم جلسة في مؤتمر PAIRS Neuro بدبي، من الاجتماعات التي تجمع أخصائيين من أفريقيا والشرق الأوسط لتطوير التخصص في المنطقة.",
    },
  },
  {
    focus: { x: 48, y: 35 },
    en: {
      alt: "Dr. Mohamed Aggour in conversation with colleagues in a congress hall",
      meta: "Nice · 2022 · ESMINT annual congress",
      caption:
        "Between sessions at the ESMINT annual congress in Nice, talking through a difficult aneurysm case with colleagues who had presented it earlier that morning in the scientific programme.",
    },
    ar: {
      alt: "الدكتور محمد عجور يتحدث مع زملائه في صالة مؤتمر",
      meta: "نيس · 2022 · مؤتمر ESMINT السنوي",
      caption:
        "بين الجلسات في مؤتمر ESMINT السنوي بنيس، مناقشة حالة تمدد شرياني معقدة مع الزملاء الذين عرضوها في البرنامج العلمي صباحًا.",
    },
  },
  {
    focus: { x: 55, y: 40 },
    en: {
      alt: "Dr. Mohamed Aggour reviewing spinal vascular images on a workstation",
      meta: "Lille · 2011 · Neuroradiology unit rounds",
      caption:
        "Reviewing spinal vascular imaging during rounds at Lille University Hospital, where he led the interventional neuroradiology unit and trained fellows in catheter technique and case selection.",
    },
    ar: {
      alt: "الدكتور محمد عجور يراجع صور الأوعية الشوكية على محطة عمل",
      meta: "ليل · 2011 · جولات وحدة الأشعة العصبية",
      caption:
        "مراجعة صور الأوعية الشوكية أثناء جولات العمل في مستشفيات ليل الجامعية، حيث قاد وحدة الأشعة العصبية التداخلية ودرّب الزملاء على اختيار الحالات.",
    },
  },
  {
    focus: { x: 50, y: 45 },
    en: {
      alt: "Dr. Mohamed Aggour addressing his neuroradiology team around a meeting table",
      meta: "Saint-Étienne · 2018 · Annual unit meeting",
      caption:
        "Closing the annual unit meeting at Saint-Étienne University Hospitals, after nine years of building the interventional activity there, from emergency referrals through to follow-up imaging.",
    },
    ar: {
      alt: "الدكتور محمد عجور يخاطب فريقه في اجتماع حول طاولة",
      meta: "سانت إتيان · 2018 · اجتماع الوحدة السنوي",
      caption:
        "ختام الاجتماع السنوي للفريق في مستشفيات سانت إتيان الجامعية، بعد تسع سنوات من بناء نشاط التداخل، من الإحالات الطارئة إلى صور المتابعة.",
    },
  },
];

function momentFor(entry: FixtureEntry, locale: "en" | "ar"): BiographyMoment {
  const copy = entry[locale];
  return { ...PORTRAIT, ...copy, focus: entry.focus };
}

/** A gallery of `count` photos (3 to 6) in the requested locale. */
export function biographyMomentsFixture(locale: Locale, count: FixtureCount): BiographyMoments {
  const copy = locale === "ar" ? "ar" : "en";

  return {
    title: titles[copy],
    intro: intros[copy],
    moments: entries.slice(0, count).map((entry) => momentFor(entry, copy)),
  };
}
