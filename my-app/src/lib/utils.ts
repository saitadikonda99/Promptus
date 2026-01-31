import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Capitalize first letter (e.g. "navbar" → "Navbar"). */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Copy text to clipboard; uses execCommand fallback when clipboard API unavailable. */
export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !text) return Promise.resolve(false)
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
  }
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.position = "fixed"
  textarea.style.left = "-9999px"
  textarea.style.top = "0"
  textarea.setAttribute("readonly", "")
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, text.length)
  let ok = false
  try {
    ok = document.execCommand("copy")
  } finally {
    document.body.removeChild(textarea)
  }
  return Promise.resolve(ok)
}
