/**
 * Combines multiple class names into a single string.
 * Filters out any falsy values before joining.
 * 
 * @param classes - The class names to be combined.
 * @returns A single string of space-separated class names.
 */

export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
