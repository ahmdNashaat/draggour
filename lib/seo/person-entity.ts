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
    { name: "Brain Aneurysm", slug: "brain-aneurysm" },
    { name: "Stroke", slug: "stroke" },
    { name: "Arteriovenous Malformation (AVM)", slug: "avm" },
    { name: "Carotid Stenosis", slug: "carotid-stenosis" },
    { name: "Venous Sinus Disorders", slug: "venous-sinus-disorders" },
    { name: "Chronic Subdural Haematoma", slug: "chronic-subdural-haematoma" },
  ],
  // Approval pack G3/G4 and source-of-truth §16 gate external identity links.
  approvedSameAs: [] as readonly string[],
} as const;

export function buildPersonId(origin: URL): string {
  return new URL("/#person", origin).toString();
}
