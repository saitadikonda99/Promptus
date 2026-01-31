"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CONTENT_ID = "docs-content";
const MIN_HEADINGS = 2;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || "section";
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface DocsTocProps {
  className?: string;
}

export default function DocsToc({ className }: DocsTocProps) {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scan headings and assign ids when pathname changes
  useEffect(() => {
    const container = document.getElementById(CONTENT_ID);
    if (!container) {
      setItems([]);
      return;
    }
    const headings = container.querySelectorAll<HTMLHeadingElement>("h2, h3");
    const seen = new Set<string>();
    const toc: TocItem[] = [];
    headings.forEach((el, i) => {
      const text = el.textContent?.trim() || "";
      let slug = slugify(text);
      if (!slug) slug = `section-${i}`;
      if (seen.has(slug)) {
        let n = 1;
        while (seen.has(`${slug}-${n}`)) n++;
        slug = `${slug}-${n}`;
      }
      seen.add(slug);
      if (!el.id) el.id = slug;
      toc.push({
        id: slug,
        text,
        level: el.tagName === "H2" ? 2 : 3,
      });
    });
    setItems(toc);
    setActiveId(toc[0]?.id ?? null);
  }, [pathname]);

  // Intersection Observer: highlight visible section
  useEffect(() => {
    if (items.length === 0) return;
    const container = document.getElementById(CONTENT_ID);
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (id) setActiveId(id);
        }
      },
      {
        root: null,
        rootMargin: "-80px 0px -66% 0px",
        threshold: 0,
      }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length < MIN_HEADINGS) return null;

  return (
    <aside
      className={cn(
        "hidden w-52 shrink-0 pl-8 pt-8 lg:block",
        "sticky top-[57px] self-start",
        "max-h-[calc(100vh-6rem)] overflow-y-auto",
        className
      )}
      aria-label="On this page"
    >
      <nav className="flex flex-col gap-1 border-l border-border/60 pl-2">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        {items.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={cn(
              "block text-sm transition-colors duration-150 -ml-px",
              level === 3 && "pl-3",
              activeId === id
                ? "font-medium text-primary border-l-2 border-primary pl-3"
                : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"
            )}
          >
            {text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
