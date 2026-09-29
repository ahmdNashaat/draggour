import Link from "next/link";

type ArrowLinkProps = Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
}>;

export function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  return (
    <Link className={`arrow-link ${className}`.trim()} href={href}>
      <span>{children}</span>
      <svg aria-hidden="true" className="arrow-link__icon" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
      </svg>
    </Link>
  );
}
