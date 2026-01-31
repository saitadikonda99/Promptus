"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type Component,
  type PromptConfig,
  DEFAULT_CONFIG,
} from "@/lib/types";

const STORAGE_KEY = "promptus-prompt-config";

function loadConfigFromStorage(): PromptConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "version" in parsed &&
      "framework" in parsed &&
      "components" in parsed &&
      Array.isArray(parsed.components)
    ) {
      return { ...DEFAULT_CONFIG, ...parsed } as PromptConfig;
    }
  } catch {
    // Invalid or missing; use default
  }
  return DEFAULT_CONFIG;
}

function saveConfigToStorage(config: PromptConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage errors (e.g. quota, private mode)
  }
}

export function usePromptConfig() {
  const [config, setConfigState] = useState<PromptConfig>(loadConfigFromStorage);

  useEffect(() => {
    saveConfigToStorage(config);
  }, [config]);

  const setConfig = useCallback((value: PromptConfig | ((prev: PromptConfig) => PromptConfig)) => {
    setConfigState(value);
  }, []);

  const updateConfig = useCallback((partial: Partial<PromptConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleComponent = useCallback((component: Component) => {
    setConfigState((prev) => {
      const has = prev.components.includes(component);
      const next = has
        ? prev.components.filter((c) => c !== component)
        : [...prev.components, component];
      return { ...prev, components: next };
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_CONFIG);
  }, []);

  return {
    config,
    setConfig,
    updateConfig,
    toggleComponent,
    resetConfig,
  };
}
