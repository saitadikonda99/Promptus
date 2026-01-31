"use client";

import type { CssFramework, Framework, PromptConfig } from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const CSS_FRAMEWORK_OPTIONS: { value: CssFramework; label: string }[] = [
  { value: "tailwind", label: "Tailwind" },
  { value: "chakra", label: "Chakra UI" },
  { value: "mui", label: "MUI" },
  { value: "none", label: "None" },
];

export default function FrameworkSection({
  config,
  updateConfig,
}: FrameworkSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-foreground">Framework</Label>
        <RadioGroup
          value={config.framework}
          onValueChange={(value) =>
            updateConfig({ framework: value as Framework })
          }
          className="flex flex-col gap-3"
        >
          {FRAMEWORK_OPTIONS.map(({ value, label }) => (
            <div key={value} className="flex items-center gap-3">
              <RadioGroupItem value={value} id={`framework-${value}`} />
              <Label
                htmlFor={`framework-${value}`}
                className="cursor-pointer font-normal text-foreground"
              >
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="css-framework" className="text-foreground">
          CSS framework
        </Label>
        <Select
          value={config.cssFramework}
          onValueChange={(value) =>
            updateConfig({ cssFramework: value as CssFramework })
          }
        >
          <SelectTrigger id="css-framework" className="w-full">
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
      </div>
    </div>
  );
}
