import type { Locale } from "@/content/site";
import { conditionMedicalDisclaimer, getConditionReviewLine } from "@/content/patient-conditions";

/**
 * The two lines that stand on the conditions hub and on every condition page:
 * who reviewed the copy and when, plus the general-terms and emergency notice.
 */
export function ConditionReviewLine({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <p className="condition-reviewed-by">
      {getConditionReviewLine(locale === "ar" ? "ar" : "en")}
    </p>
  );
}

export function ConditionMedicalDisclaimer({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <aside
      className="condition-medical-disclaimer"
      aria-label={locale === "ar" ? "تنبيه طبي" : "Medical disclaimer"}
    >
      <div className="site-container">
        <p>{conditionMedicalDisclaimer[locale === "ar" ? "ar" : "en"]}</p>
      </div>
    </aside>
  );
}
