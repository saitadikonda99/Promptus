import type { BuilderMode } from "./types";

const PLACEHOLDERS = {
  PAGE_TYPE: "{{PAGE_TYPE}}",
  FRAMEWORK: "{{FRAMEWORK}}",
  CSS_FRAMEWORK: "{{CSS_FRAMEWORK}}",
  THEME: "{{THEME}}",
  PRIMARY_COLOR: "{{PRIMARY_COLOR}}",
  ACCENT_COLOR: "{{ACCENT_COLOR}}",
  DESIGN_STYLE: "{{DESIGN_STYLE}}",
  COMPONENTS_LIST: "{{COMPONENTS_LIST}}",
  COMPONENT_DETAILS: "{{COMPONENT_DETAILS}}",
  RESPONSIVE: "{{RESPONSIVE}}",
  ANIMATIONS: "{{ANIMATIONS}}",
  ACCESSIBILITY: "{{ACCESSIBILITY}}",
  OUTPUT_FORMAT: "{{OUTPUT_FORMAT}}",
} as const;

const BASE_BODY = `
**Page type:** {{PAGE_TYPE}}

**Stack:** {{FRAMEWORK}} with {{CSS_FRAMEWORK}} for styling.

**Theme:** {{THEME}}. Primary color: {{PRIMARY_COLOR}}, accent: {{ACCENT_COLOR}}. Design style: {{DESIGN_STYLE}}.

**Sections to build (component-based):** {{COMPONENTS_LIST}}

{{COMPONENT_DETAILS}}

**Requirements:**
- Use a component-based architecture: one component per section, reusable UI primitives, clear separation of concerns.
- Write clean, production-ready code. Prefer composition over duplication.
- Layout: {{RESPONSIVE}}
- Animations: {{ANIMATIONS}}
- Accessibility: {{ACCESSIBILITY}}
- Output: {{OUTPUT_FORMAT}}
`.trim();

const LOVABLE = `You are building a production-ready {{PAGE_TYPE}} app. Ship something users can deploy and iterate on quickly.

${BASE_BODY}
`.trim();

const V0 = `Generate a high-quality {{PAGE_TYPE}} UI. Follow modern patterns and v0-style component structure.

${BASE_BODY}
`.trim();

const BOLT = `Create a {{PAGE_TYPE}} experience optimized for the Bolt stack. Focus on fast iteration and clear structure.

${BASE_BODY}
`.trim();

const VIBECODING_BODY = `
**Page type:** {{PAGE_TYPE}}

**Stack:** {{FRAMEWORK}} with {{CSS_FRAMEWORK}} for styling.

**Theme:** {{THEME}}. Primary color: {{PRIMARY_COLOR}}, accent: {{ACCENT_COLOR}}. Design style: {{DESIGN_STYLE}}.

**Sections to build (component-based):** {{COMPONENTS_LIST}}

{{COMPONENT_DETAILS}}

**Implementation approach:**
1. Explain each step before writing code (what we're building and why).
2. Provide developer guidance: clean architecture, separation of concerns, naming conventions.
3. Include brief comments and reasoning hints in code so the developer learns while building.
4. Generate prompts that guide coding step-by-step, like a mentor helping build features—both tell the builder what to build and help developers understand the code.

**Requirements:**
- Use a component-based architecture: one component per section, reusable UI primitives.
- Write clean, production-ready code. Prefer composition over duplication.
- Layout: {{RESPONSIVE}}
- Animations: {{ANIMATIONS}}
- Accessibility: {{ACCESSIBILITY}}
- Output: {{OUTPUT_FORMAT}}
`.trim();

const VIBECODING = `You are a coding mentor helping build a {{PAGE_TYPE}} application. Guide step-by-step: explain implementation steps, provide developer guidance, encourage clean architecture, and include comments and reasoning hints so the developer understands the code while building.

${VIBECODING_BODY}
`.trim();

const GENERIC = `Produce a professional {{PAGE_TYPE}} application. Use a component-based architecture and write clean, reusable code.

${BASE_BODY}
`.trim();

const TEMPLATES: Record<BuilderMode, string> = {
  lovable: LOVABLE,
  v0: V0,
  bolt: BOLT,
  vibecoding: VIBECODING,
  generic: GENERIC,
};

/**
 * Returns the prompt template for the given builder mode.
 * Templates include placeholders for page type, framework, theme, colors, design style,
 * components list and details, responsive/animations/accessibility, and output format.
 * Falls back to vibecoding for unknown/legacy modes (e.g. chatgpt, cursor).
 */
export function getTemplate(builderMode: BuilderMode | string): string {
  return builderMode in TEMPLATES
    ? TEMPLATES[builderMode as BuilderMode]
    : TEMPLATES.vibecoding;
}

export { PLACEHOLDERS };
