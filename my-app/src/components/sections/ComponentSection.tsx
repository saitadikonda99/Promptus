"use client";

import type { Component, PromptConfig } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface ComponentSectionProps {
  config: PromptConfig;
  toggleComponent: (component: Component) => void;
}

const ALL_COMPONENTS: Component[] = [
  "navbar",
  "sidebar",
  "hero",
  "features",
  "faq",
  "pricing",
  "stats",
  "charts",
  "table",
  "footer",
];

function componentLabel(value: Component): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ComponentSection({
  config,
  toggleComponent,
}: ComponentSectionProps) {
  const selected = new Set(config.components);

  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-xs">
        Pick the UI building blocks to generate.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {ALL_COMPONENTS.map((component) => {
          const isChecked = selected.has(component);
          return (
            <div
              key={component}
              className={cn(
                "flex items-center gap-2 rounded-xl border-2 px-3 py-2 transition-colors",
                isChecked
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <Checkbox
                id={`component-${component}`}
                checked={isChecked}
                onCheckedChange={() => toggleComponent(component)}
                className="rounded-md border-2 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <Label
                htmlFor={`component-${component}`}
                className="cursor-pointer flex-1 font-normal text-foreground text-sm"
              >
                {componentLabel(component)}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
