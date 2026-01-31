export type Framework = "nextjs" | "react" | "vue" | "svelte";

export type CssFramework = "tailwind" | "chakra" | "mui" | "none";

export type PageType =
  | "landing"
  | "dashboard"
  | "saas"
  | "portfolio"
  | "blog"
  | "ecommerce";

export type ThemeMode = "light" | "dark" | "system";

export type DesignStyle =
  | "minimal"
  | "modern"
  | "brutalist"
  | "glassmorphism"
  | "neubrutalism";

export type OutputFormat =
  | "code-only"
  | "with-explanations"
  | "step-by-step";

export type CodeStructure = "single-file" | "component-based";

export type BuilderMode =
  | "lovable"
  | "v0"
  | "bolt"
  | "vibecoding"
  | "generic";

const VALID_BUILDER_MODES: readonly BuilderMode[] = [
  "lovable",
  "v0",
  "bolt",
  "vibecoding",
  "generic",
];

/** Normalize config so builderMode is always a current mode (handles legacy chatgpt/cursor). */
export function normalizePromptConfig(config: PromptConfig): PromptConfig {
  if ((VALID_BUILDER_MODES as readonly string[]).includes(config.builderMode)) {
    return config;
  }
  return { ...config, builderMode: "vibecoding" };
}

export type Component =
  | "navbar"
  | "sidebar"
  | "hero"
  | "features"
  | "pricing"
  | "faq"
  | "footer"
  | "stats"
  | "charts"
  | "table";

export interface PromptConfig {
  version: "1.0";

  framework: Framework;
  cssFramework: CssFramework;

  pageType: PageType;

  components: Component[];

  theme: ThemeMode;
  colorScheme: {
    primary: string;
    accent: string;
  };

  designStyle: DesignStyle;
  animations: boolean;

  responsive: boolean;
  accessibility: boolean;
  seo: boolean;

  outputFormat: OutputFormat;
  codeStructure: CodeStructure;

  builderMode: BuilderMode;
}

export const DEFAULT_CONFIG: PromptConfig = {
    version: "1.0",
  
    framework: "nextjs",
    cssFramework: "tailwind",
  
    pageType: "landing",
  
    components: ["navbar", "hero", "features", "footer"],
  
    theme: "system",
    colorScheme: {
      primary: "#6366f1",
      accent: "#22d3ee",
    },
  
    designStyle: "modern",
    animations: true,
  
    responsive: true,
    accessibility: true,
    seo: true,
  
    outputFormat: "code-only",
    codeStructure: "component-based",
  
    builderMode: "vibecoding",
  };
  