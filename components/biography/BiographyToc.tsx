import { useTranslations } from "next-intl";

export function BiographyToc() {
  const ui = useTranslations("content.biography");

  const sections = [
    { id: "biography-overview", label: ui("overview") },
    { id: "biography-current-positions", label: ui("currentPositions") },
    { id: "biography-career-history", label: ui("careerHistory") },
    { id: "biography-previous-positions", label: ui("previousPositions") },
    { id: "biography-qualifications", label: ui("qualifications") },
    { id: "biography-societies", label: ui("societies") },
    { id: "biography-teaching", label: ui("teaching") },
    { id: "biography-academic", label: ui("academic") },
    { id: "biography-research", label: ui("research") },
    { id: "biography-leadership", label: ui("leadership") },
    { id: "biography-milestones", label: ui("milestones") },
    { id: "biography-clinical-expertise", label: ui("clinicalExpertise") },
    { id: "biography-annual-activity", label: ui("annualActivity") },
  ];

  return (
    <nav className="biography-toc" aria-label={ui("title")}>
      <div className="site-container">
        <ul className="biography-toc__list">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
