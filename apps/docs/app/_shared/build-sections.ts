import type { SideNavSection } from './patterns';

interface CategoryItem {
  category: string;
  name: string;
  slug: string;
}

interface Category {
  key: string;
  label: string;
}

export function buildSections(
  categories: Category[],
  items: CategoryItem[],
  basePath: string,
): SideNavSection[] {
  return categories.map((cat) => ({
    heading: cat.label,
    items: items
      .filter((item) => item.category === cat.key)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item) => ({
        label: item.name,
        href: `${basePath}/${item.slug}`,
      })),
  }));
}
