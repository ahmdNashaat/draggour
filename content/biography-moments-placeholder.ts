import type { BiographyMoments } from "@/content/biography";

/**
 * TEMPORARY placeholder gallery.
 *
 * The doctor has no event photos yet, so the "Moments" section is previewed
 * with his existing portrait repeated, plus sample meta and captions drawn
 * only from the biography text already on the site. These are placeholders
 * about a real person:
 *
 * - they render only when NEXT_PUBLIC_MOMENTS_PLACEHOLDER === "1"
 *   (Vercel Preview scope only, never Production), and
 * - a production build without that flag contains none of this file
 *   (verified by grepping the .next output for "20XX" and the captions).
 *
 * The year is deliberately "20XX": the real years come from the doctor, and
 * so do the real photographs and their approved captions. The data still has
 * to pass every rule in lib/biography-moments.ts — it is validated like any
 * published gallery, not exempted from one.
 */

/** The biography hero's portrait, already approved and already on the page. */
const PORTRAIT_SRC = "/images/doctor/dr-mohamed-aggour.png";
const PORTRAIT_WIDTH = 1024;
const PORTRAIT_HEIGHT = 1536;

const portrait = { src: PORTRAIT_SRC, width: PORTRAIT_WIDTH, height: PORTRAIT_HEIGHT };
// The portrait (height > width) renders with `contain`, so the standing
// figure shows whole in every cell — nothing clipped, head or otherwise.
// The focus stays as the cover fallback: top-anchored, because the crown
// starts at 8.9% of the height and y=20 cropped it in a 4/3 cell (12.5%
// in 16/9) (measured and fixed 2026-10-24).
const focus = { x: 50, y: 0 };

export const placeholderMoments = {
  en: {
    title: "Moments from practice and teaching",
    moments: [
      { ...portrait, focus,
        alt: "Portrait of Dr. Mohamed Aggour in a dark suit (placeholder for the event photo)",
        meta: "Dubai · 20XX · PAIRS Neuro Congress",
        caption: "The PAIRS Neuro congress in Dubai, through which Dr. Aggour helps develop interventional neuroradiology in Africa and the Middle East." },
      { ...portrait, focus,
        alt: "Portrait of Dr. Mohamed Aggour in a dark suit (placeholder for the event photo)",
        meta: "Oxford · 20XX · ECMINT Course",
        caption: "Teaching on the Oxford ECMINT course, part of Dr. Aggour's work in training the next generation of neurointerventionists." },
      { ...portrait, focus,
        alt: "Portrait of Dr. Mohamed Aggour in a dark suit (placeholder for the event photo)",
        meta: "London · 20XX · Stroke Thrombectomy Service",
        caption: "Helping to develop a 24/7 stroke thrombectomy service in London, so patients with an acute stroke can be treated at any hour." },
      { ...portrait, focus,
        alt: "Portrait of Dr. Mohamed Aggour in a dark suit (placeholder for the event photo)",
        meta: "Lille · 20XX · Lille University Hospital",
        caption: "Leading an interventional neuroradiology unit at the university hospital in Lille, before moving to London." },
      { ...portrait, focus,
        alt: "Portrait of Dr. Mohamed Aggour in a dark suit (placeholder for the event photo)",
        meta: "Saint-Étienne · 20XX · Saint-Étienne University Hospital",
        caption: "Leading an interventional neuroradiology unit at the university hospital in Saint-Étienne, in the years before London." },
      { ...portrait, focus,
        alt: "Portrait of Dr. Mohamed Aggour in a dark suit (placeholder for the event photo)",
        meta: "Cairo · 20XX · Early training",
        caption: "Part of Dr. Aggour's training took place in Cairo, before he continued his specialist training in France." },
    ],
  },
  ar: {
    title: "من الممارسة والتدريس",
    moments: [
      { ...portrait, focus,
        alt: "صورة شخصية للدكتور محمد عجور بالبدلة الداكنة (صورة مؤقتة بدل صورة الحدث)",
        meta: "دبي · 20XX · مؤتمر PAIRS Neuro",
        caption: "مؤتمر PAIRS Neuro في دبي، ويسهم الدكتور عجور من خلاله في تطوير التخصص في أفريقيا والشرق الأوسط." },
      { ...portrait, focus,
        alt: "صورة شخصية للدكتور محمد عجور بالبدلة الداكنة (صورة مؤقتة بدل صورة الحدث)",
        meta: "أكسفورد · 20XX · دورة ECMINT",
        caption: "التدريس في دورة ECMINT بجامعة أكسفورد، ضمن عمل الدكتور عجور في تدريب الجيل القادم من أطباء القسطرة العصبية." },
      { ...portrait, focus,
        alt: "صورة شخصية للدكتور محمد عجور بالبدلة الداكنة (صورة مؤقتة بدل صورة الحدث)",
        meta: "لندن · 20XX · خدمة علاج السكتة الدماغية",
        caption: "المساهمة في تطوير خدمة علاج السكتة الدماغية واستخراج الجلطات على مدار الساعة في لندن، ليحصل المريض على العلاج في أي وقت." },
      { ...portrait, focus,
        alt: "صورة شخصية للدكتور محمد عجور بالبدلة الداكنة (صورة مؤقتة بدل صورة الحدث)",
        meta: "ليل · 20XX · مستشفى جامعة ليل",
        caption: "قيادة وحدة الأشعة العصبية التداخلية في مستشفى جامعة ليل قبل الانتقال إلى لندن." },
      { ...portrait, focus,
        alt: "صورة شخصية للدكتور محمد عجور بالبدلة الداكنة (صورة مؤقتة بدل صورة الحدث)",
        meta: "سانت إتيان · 20XX · مستشفى جامعة سانت إتيان",
        caption: "قيادة وحدة الأشعة العصبية التداخلية في مستشفى جامعة سانت إتيان في السنوات التي سبقت لندن." },
      { ...portrait, focus,
        alt: "صورة شخصية للدكتور محمد عجور بالبدلة الداكنة (صورة مؤقتة بدل صورة الحدث)",
        meta: "القاهرة · 20XX · التدريب الأول",
        caption: "جزء من تدريب الدكتور عجور كان في القاهرة، قبل أن يواصل تدريبه التخصصي في فرنسا." },
    ],
  },
} as const satisfies Readonly<Record<"en" | "ar", BiographyMoments>>;

/** The two placeholder galleries, ready for `validateBiographyMoments`. */
export function placeholderMomentsPair(): Readonly<{ en: BiographyMoments; ar: BiographyMoments }> {
  return placeholderMoments;
}
