/**
 * Proposed copy from section 5 of the UI/UX spec. Every string here is
 * pending Dr. Aggour's approval, so nothing in this file ships by default.
 *
 * Setting SHOW_PENDING_COPY=1 activates it in development only, which is how
 * the proposed wording is previewed and screenshotted. The flag is ignored in
 * production builds, and approval is a copy-only commit: move the string into
 * messages/*.json or the content files and delete it from here.
 */

export const showPendingCopy =
  process.env.SHOW_PENDING_COPY === "1" && process.env.NODE_ENV !== "production";

/**
 * English procedure labels for the condition scope lists. Only the English
 * wording changes here: the Arabic labels were already written to match.
 */
export const pendingConditionScope: Readonly<Partial<Record<string, readonly string[]>>> = {
  "brain-aneurysm": [
    "Coiling",
    "Balloon-assisted coiling",
    "Stent-assisted coiling",
    "Flow diverters",
    "Intrasaccular flow disruptors",
    "Liquid embolic agents (LEA)",
    "Closing the affected vessel when appropriate",
  ],
};

/**
 * First overview paragraph of the biography, replacing the
 * literal-translation phrasing. The English sentence keeps the approved
 * opening and only the tail is new.
 */
export const pendingBiographyIntro = {
  en: "Dr. Mohamed Aggour is a Consultant Interventional Neuroradiologist with more than nineteen years of experience treating brain and spine blood-vessel diseases through catheter-based, minimally invasive procedures.",
  ar: "الدكتور محمد عجور استشاري الأشعة العصبية التداخلية، بخبرة تزيد على تسعة عشر عامًا في علاج أمراض الأوعية الدموية الدماغية والشوكية بالقسطرة وبدون جراحة مفتوحة.",
} as const;
