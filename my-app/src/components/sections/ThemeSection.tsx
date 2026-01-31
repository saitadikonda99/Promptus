"use client";

import type { PromptConfig, ThemeMode } from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ThemeSectionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export default function ThemeSection({
  config,
  updateConfig,
}: ThemeSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">
        Theme & Colors
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme-mode" className="text-foreground">
            Theme mode
          </Label>
          <Select
            value={config.theme}
            onValueChange={(value) =>
              updateConfig({ theme: value as ThemeMode })
            }
          >
            <SelectTrigger id="theme-mode" className="w-full">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {THEME_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="color-primary" className="text-foreground">
              Primary color
            </Label>
            <div className="flex items-center gap-3">
              <input
                id="color-primary"
                type="color"
                value={config.colorScheme.primary}
                onChange={(e) =>
                  updateConfig({
                    colorScheme: {
                      ...config.colorScheme,
                      primary: e.target.value,
                    },
                  })
                }
                className="h-9 w-14 cursor-pointer border border-input bg-transparent p-0.5"
              />
              <span className="text-muted-foreground text-xs font-mono">
                {config.colorScheme.primary}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color-accent" className="text-foreground">
              Accent color
            </Label>
            <div className="flex items-center gap-3">
              <input
                id="color-accent"
                type="color"
                value={config.colorScheme.accent}
                onChange={(e) =>
                  updateConfig({
                    colorScheme: {
                      ...config.colorScheme,
                      accent: e.target.value,
                    },
                  })
                }
                className="h-9 w-14 cursor-pointer border border-input bg-transparent p-0.5"
              />
              <span className="text-muted-foreground text-xs font-mono">
                {config.colorScheme.accent}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
