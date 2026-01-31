"use client";

import type { CssFramework, Framework, PromptConfig } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface FrameworkSectionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const FRAMEWORK_OPTIONS: { value: Framework; label: string }[] = [
  { value: "nextjs", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

const CSS_FRAMEWORK_OPTIONS: { value: CssFramework; label: string; description?: string }[] = [
  { value: "tailwind", label: "Tailwind", description: "Tailwind keeps it fast and consistent." },
  { value: "chakra", label: "Chakra UI", description: "Chakra UI for accessible components." },
  { value: "mui", label: "MUI", description: "Material UI for React." },
  { value: "none", label: "None", description: "No CSS framework." },
];

export default function FrameworkSection({
  config,
  updateConfig,
}: FrameworkSectionProps) {
  const cssDescription =
    CSS_FRAMEWORK_OPTIONS.find((o) => o.value === config.cssFramework)?.description ?? "";

  return (
    <div className="space-y-6">
      {/* Framework: button-style options */}
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          {FRAMEWORK_OPTIONS.map(({ value, label }) => {
            const isSelected = config.framework === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => updateConfig({ framework: value })}
                aria-label={`Select ${label}`}
                aria-pressed={isSelected}
                className={cn(
                  "flex w-full items-center rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition-colors",
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CSS: dropdown + description */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground">CSS</span>
        <Select
          value={config.cssFramework}
          onValueChange={(value) =>
            updateConfig({ cssFramework: value as CssFramework })
          }
        >
          <SelectTrigger
            id="css-framework"
            className="w-full rounded-xl border-2 border-border"
          >
            <SelectValue placeholder="Select CSS framework" />
          </SelectTrigger>
          <SelectContent>
            {CSS_FRAMEWORK_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {cssDescription && (
          <p className="text-muted-foreground text-xs">{cssDescription}</p>
        )}
      </div>
    </div>
  );
}
