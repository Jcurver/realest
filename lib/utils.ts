import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  
  // Check if values exist and are not placeholder values
  if (!url || !key) return false;
  if (url === "your-project-url" || key === "your-publishable-or-anon-key") return false;
  
  // Check if URL is a valid HTTP/HTTPS URL
  try {
    const urlObj = new URL(url);
    if (!["http:", "https:"].includes(urlObj.protocol)) return false;
  } catch {
    return false;
  }
  
  return true;
})();
