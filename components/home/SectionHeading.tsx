import Link from "next/link";

type SectionHeadingProps = Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  href?: string;
}>;

export function SectionHeading({ eyebrow, title, description, id, href }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{href ? <Link className="section-heading__link" href={href}>{title}</Link> : title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}
