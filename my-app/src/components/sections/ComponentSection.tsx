"use client";

import type { Component, PromptConfig } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface ComponentSectionProps {
  config: PromptConfig;
  toggleComponent: (component: Component) => void;
}

const COMPONENT_GROUPS: { label: string; components: Component[] }[] = [
  { label: "Navigation", components: ["navbar", "sidebar"] },
  { label: "Content", components: ["hero", "features", "pricing", "faq"] },
  { label: "Dashboard", components: ["stats", "charts", "table"] },
  { label: "Footer", components: ["footer"] },
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
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Components</h3>
      <div className="space-y-4">
        {COMPONENT_GROUPS.map((group) => (
          <div key={group.label} className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              {group.label}
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {group.components.map((component) => (
                <div
                  key={component}
                  className="flex items-center gap-3 space-y-0"
                >
                  <Checkbox
                    id={`component-${component}`}
                    checked={selected.has(component)}
                    onCheckedChange={() => toggleComponent(component)}
                  />
                  <Label
                    htmlFor={`component-${component}`}
                    className="cursor-pointer font-normal text-foreground"
                  >
                    {componentLabel(component)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
