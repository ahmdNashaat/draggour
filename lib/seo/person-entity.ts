import { siteIdentity } from "../../content/site";

/**
 * Identity assertions allowed in Person JSON-LD. Relationships that are
 * awaiting doctor approval intentionally remain out of this public allowlist.
 */
export const personEntityConfig = {
  canonicalName: siteIdentity.name,
  localizedName: siteIdentity.localizedName,
  professionalTitles: siteIdentity.professionalTitle,
  knowsAbout: ["Interventional Neuroradiology"],
  conditions: [
    { name: "Cerebral and spinal angiography", slug: "angiography" },
    { name: "Brain Aneurysm", slug: "brain-aneurysm" },
    { name: "Arteriovenous Malformation (AVM)", slug: "avm" },
    { name: "Mechanical thrombectomy for acute stroke", slug: "stroke-thrombectomy" },
    { name: "Dural and carotid-cavernous fistula embolisation", slug: "fistulas" },
    { name: "Venous sinus stenting", slug: "venous-sinus-stenting" },
    { name: "Neck and intracranial angioplasty and stenting", slug: "carotid-intracranial-stenting" },
    { name: "Paediatric interventions, including vein of Galen embolization", slug: "paediatric" },
    { name: "Chronic Subdural Haematoma", slug: "chronic-subdural-haematoma" },
    { name: "Other embolisation: nosebleeds, tumours and trauma", slug: "other-embolisation" },
  ],
  // Approval pack G3/G4 and source-of-truth §16 gate external identity links.
  // TODO(person-schema): when the final YouTube channel URL replaces the
  // placeholder in content/learning-links.ts, add that exact URL here so the
  // Person JSON-LD `sameAs` carries it. The temporary URL must never land here.
  approvedSameAs: [] as readonly string[],
} as const;

export function buildPersonId(origin: URL): string {
  return new URL("/#person", origin).toString();
}
