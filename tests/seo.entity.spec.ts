import { expect, test } from "@playwright/test";

import { siteIdentity, type Locale } from "../content/site";
import { buildBiographyJsonLd, buildPersonJsonLd, type JsonLdValue } from "../lib/seo/json-ld";

const testOrigin = new URL("https://seo-test.example.test");
const expectedPersonId = `${testOrigin.origin}/#person`;

type EntityNode = JsonLdValue & {
  "@type"?: string | string[];
  "@id"?: string;
  "@graph"?: EntityNode[];
  mainEntity?: { "@id"?: string };
  name?: string;
  alternateName?: string;
  jobTitle?: string[];
  knowsAbout?: (string | { "@type"?: string; "@id"?: string; name?: string; url?: string })[];
  sameAs?: string[];
  url?: string;
};

function graphNodes(node: EntityNode): EntityNode[] {
  const graph = node["@graph"] ?? [];
  return [node, ...graph.flatMap((child) => graphNodes(child))];
}

for (const locale of ["en", "ar"] as const satisfies readonly Locale[]) {
  test(`${locale} entity builders use the one canonical Person and ProfilePage relationship`, () => {
    const home = buildPersonJsonLd(testOrigin) as EntityNode;
    const biography = buildBiographyJsonLd(locale, testOrigin) as EntityNode;
    const homePersons = graphNodes(home).filter((node) => node["@type"] === "Person");
    const biographyNodes = graphNodes(biography);
    const biographyPersons = biographyNodes.filter((node) => node["@type"] === "Person");
    const profilePage = biographyNodes.find((node) => node["@type"] === "ProfilePage");

    expect(homePersons).toHaveLength(1);
    expect(biographyPersons).toHaveLength(1);
    expect(homePersons[0]["@id"]).toBe(expectedPersonId);
    expect(biographyPersons[0]["@id"]).toBe(expectedPersonId);
    expect(profilePage?.mainEntity).toEqual({ "@id": expectedPersonId });
    expect(profilePage?.url).toBe(`${testOrigin.origin}/${locale}/biography`);
    expect(profilePage?.name).toBe(locale === "ar"
      ? `السيرة الذاتية | ${siteIdentity.localizedName.ar}`
      : `Biography | ${siteIdentity.name}`);
    expect(homePersons[0].name).toBe(siteIdentity.name);
    expect(biographyPersons[0].name).toBe(siteIdentity.name);
    expect(biographyPersons[0].alternateName).toBe(siteIdentity.localizedName.ar);
    expect(biographyPersons[0].jobTitle).toEqual([
      siteIdentity.professionalTitle.en,
      siteIdentity.professionalTitle.ar,
    ]);
    expect(biographyPersons[0].knowsAbout?.[0]).toBe("Interventional Neuroradiology");
    const medicalConditions = biographyPersons[0].knowsAbout?.slice(1) ?? [];
    expect(medicalConditions.map((item) => typeof item === "string" ? item : item.name)).toEqual([
      "Brain Aneurysm",
      "Stroke",
      "Arteriovenous Malformation (AVM)",
      "Carotid Stenosis",
      "Venous Sinus Disorders",
      "Chronic Subdural Haematoma",
    ]);
    expect(medicalConditions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ "@type": "MedicalCondition", "@id": `${testOrigin.origin}/en/conditions/brain-aneurysm` }),
        expect.objectContaining({ "@type": "MedicalCondition", "@id": `${testOrigin.origin}/en/conditions/stroke` }),
        expect.objectContaining({ "@type": "MedicalCondition", "@id": `${testOrigin.origin}/en/conditions/avm` }),
        expect.objectContaining({ "@type": "MedicalCondition", "@id": `${testOrigin.origin}/en/conditions/carotid-stenosis` }),
        expect.objectContaining({ "@type": "MedicalCondition", "@id": `${testOrigin.origin}/en/conditions/venous-sinus-disorders` }),
        expect.objectContaining({ "@type": "MedicalCondition", "@id": `${testOrigin.origin}/en/conditions/chronic-subdural-haematoma` }),
      ]),
    );
    expect(biographyPersons[0].sameAs ?? []).toEqual([]);
    expect(JSON.stringify(biography)).not.toMatch(/localhost|127\.0\.0\.1|\.vercel\.app|youtube\.com/i);
    expect(() => JSON.parse(JSON.stringify(biography))).not.toThrow();
  });

  test(`${locale} rendered pages keep the visible identity and suppress origin-bound markup without a production origin`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toHaveText(siteIdentity.localizedName[locale]);

    if (!process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
    }
  });
}
