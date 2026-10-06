import type { Locale } from "@/content/site";

export const placeholderPageKeys = [
  "home",
  "biography",
  "conditions",
  "angiography",
  "brain-aneurysm",
  "avm",
  "stroke-thrombectomy",
  "fistulas",
  "venous-sinus-stenting",
  "carotid-intracranial-stenting",
  "paediatric",
  "chronic-subdural-haematoma",
  "other-embolisation",
  "e-learning",
  "remote-consultation",
  "contact",
  "legal",
] as const;

export type PlaceholderPageKey = (typeof placeholderPageKeys)[number];

type PageDefinition = Readonly<{
  pathname: string;
  title: string;
  description: string;
  notice: string;
}>;

const pageDefinitions: Record<PlaceholderPageKey, PageDefinition> = {
  home: {
    pathname: "",
    title: "French version",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  biography: {
    pathname: "/biography",
    title: "Biography",
    description: "Approved Biography content will be added from the source material before publication.",
    notice: "Controlled prototype placeholder. No unapproved biography claims are published here.",
  },
  conditions: {
    pathname: "/conditions",
    title: "Conditions",
    description: "The six approved condition destinations are being prepared with concise, consultation-oriented content.",
    notice: "Controlled prototype placeholder. Clinical descriptions remain approval-gated.",
  },
  angiography: {
    pathname: "/conditions/angiography",
    title: "Cerebral and spinal angiography",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  "brain-aneurysm": {
    pathname: "/conditions/brain-aneurysm",
    title: "Brain Aneurysm",
    description: "Approved clinical description pending approval.",
    notice: "This condition page is intentionally concise and does not provide diagnosis or treatment advice.",
  },
  avm: {
    pathname: "/conditions/avm",
    title: "AVM",
    description: "Approved clinical description pending approval.",
    notice: "This condition page is intentionally concise and does not provide diagnosis or treatment advice.",
  },
  "stroke-thrombectomy": {
    pathname: "/conditions/stroke-thrombectomy",
    title: "Mechanical thrombectomy for acute stroke",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  fistulas: {
    pathname: "/conditions/fistulas",
    title: "Dural and carotid-cavernous fistula embolisation",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  "venous-sinus-stenting": {
    pathname: "/conditions/venous-sinus-stenting",
    title: "Venous sinus stenting",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  "carotid-intracranial-stenting": {
    pathname: "/conditions/carotid-intracranial-stenting",
    title: "Neck and intracranial angioplasty and stenting",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  paediatric: {
    pathname: "/conditions/paediatric",
    title: "Paediatric interventions, including vein of Galen embolization",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  "chronic-subdural-haematoma": {
    pathname: "/conditions/chronic-subdural-haematoma",
    title: "Chronic Subdural Haematoma",
    description: "Approved clinical description pending approval.",
    notice: "This condition page is intentionally concise and does not provide diagnosis or treatment advice.",
  },
  "other-embolisation": {
    pathname: "/conditions/other-embolisation",
    title: "Other embolisation: nosebleeds, tumours and trauma",
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  },
  "e-learning": {
    pathname: "/e-learning",
    title: "E-learning for Physicians",
    description: "The approved physician education introduction and official YouTube destination are pending approval.",
    notice: "Official YouTube URL and featured educational items are not available yet.",
  },
  "remote-consultation": {
    pathname: "/remote-consultation",
    title: "Remote Consultation",
    description: "A consultation request journey will be implemented after its approved operational and privacy details are available.",
    notice: "This controlled prototype does not submit requests, collect files, trigger WhatsApp, book appointments, or process payments.",
  },
  contact: {
    pathname: "/contact",
    title: "Contact",
    description: "Approved contact destinations and enquiry handling details will be added before publication.",
    notice: "No email, phone number, WhatsApp number, address, or unapproved social link is shown here.",
  },
  legal: {
    pathname: "/legal",
    title: "Legal & Privacy",
    description: "Approved privacy, medical disclaimer, consultation, emergency, and consent wording will be added before publication.",
    notice: "Legal copy is not represented as approved in this controlled prototype.",
  },
};

export function getPageDefinition(locale: Locale, pageKey: PlaceholderPageKey): PageDefinition {
  const definition = pageDefinitions[pageKey];

  if (locale === "en") {
    return definition;
  }

  if (locale === "ar") {
    return {
      ...definition,
      title: `${definition.title} — Arabic content pending approval`,
      description: "Arabic page content pending approval.",
      notice: "Controlled RTL placeholder. Arabic content and labels remain approval-gated.",
    };
  }

  return {
    ...definition,
    description: "Cette page n’est pas disponible dans la version actuelle.",
    notice: "Des informations seront disponibles ici.",
  };
}

export const publicPathnames = [
  "",
  ...placeholderPageKeys.filter((pageKey) => pageKey !== "home").map((pageKey) => pageDefinitions[pageKey].pathname),
] as const;
