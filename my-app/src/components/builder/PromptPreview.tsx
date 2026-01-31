"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import type { BuilderMode, PromptConfig } from "@/lib/types";
import { generatePrompt } from "@/lib/prompt-generator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PromptPreviewProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const BUILDER_MODE_OPTIONS: { value: BuilderMode; label: string }[] = [
  { value: "lovable", label: "Lovable" },
  { value: "v0", label: "v0" },
  { value: "bolt", label: "Bolt" },
  { value: "cursor", label: "Cursor" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "generic", label: "Generic" },
];

function handleCopy(prompt: string): void {
  navigator.clipboard.writeText(prompt).then(
    () => toast.success("Copied to clipboard"),
    () => toast.error("Failed to copy")
  );
}

function handleDownload(prompt: string): void {
  const blob = new Blob([prompt], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prompt.txt";
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Downloaded prompt.txt");
}

function handleShare(config: PromptConfig): void {
  if (typeof window === "undefined") return;
  try {
    const json = JSON.stringify(config);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    const encoded = encodeURIComponent(base64);
    const url = `${window.location.origin}${window.location.pathname}?config=${encoded}`;
    navigator.clipboard.writeText(url).then(
      () => toast.success("Share link copied to clipboard"),
      () => toast.error("Failed to copy link")
    );
  } catch {
    toast.error("Failed to create share link");
  }
}

export default function PromptPreview({
  config,
  updateConfig,
}: PromptPreviewProps) {
  const prompt = useMemo(() => generatePrompt(config), [config]);
  const charCount = prompt.length;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <header className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">
          Generated Prompt
        </h3>
        <Select
          value={config.builderMode}
          onValueChange={(value) =>
            updateConfig({ builderMode: value as BuilderMode })
          }
        >
          <SelectTrigger className="w-full" id="builder-mode">
            <SelectValue placeholder="Builder mode" />
          </SelectTrigger>
          <SelectContent>
            {BUILDER_MODE_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <textarea
          readOnly
          value={prompt}
          className="border-input bg-muted/30 font-mono text-xs leading-relaxed w-full flex-1 min-h-[200px] resize-none overflow-auto rounded-none border p-3 outline-none"
          spellCheck={false}
          aria-label="Generated prompt"
        />
        <p className="text-muted-foreground shrink-0 text-xs">
          {charCount.toLocaleString()} character{charCount !== 1 ? "s" : ""}
        </p>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center gap-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleCopy(prompt)}
        >
          Copy
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleDownload(prompt)}
        >
          Download .txt
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleShare(config)}
        >
          Share link
        </Button>
      </footer>
    </div>
  );
}
