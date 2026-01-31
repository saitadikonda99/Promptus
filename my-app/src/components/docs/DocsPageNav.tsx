"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPrevNext } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

export interface DocsPageNavProps {
  className?: string;
}

export default function DocsPageNav({ className }: DocsPageNavProps) {
  const pathname = usePathname();
  const { prev, next } = getPrevNext(pathname);

  if (!prev && !next) return null;

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-4 border-t border-border/60 pt-8 mt-10 transition-opacity",
        className
      )}
      aria-label="Page navigation"
    >
      <div className="min-w-0 flex-1">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span className="truncate">{prev.label}</span>
          </Link>
        ) : (
          <span />
        )}
      </div>
      <div className="min-w-0 flex-1 text-right">
        {next ? (
          <Link
            href={next.href}
            className="group ml-auto flex items-center justify-end gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="truncate">{next.label}</span>
            <ChevronRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
