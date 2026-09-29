import Link from "next/link";
import { useTranslations } from "next-intl";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations("navigation");

  return (
    <nav aria-label={t("breadcrumbLabel")} className="site-breadcrumb">
      <div className="site-container">
        <ol>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.name}>
                {isLast || !item.href ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.href}>{item.name}</Link>
                    <span className="site-breadcrumb__separator" aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
