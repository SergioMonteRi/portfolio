import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation utilities bound to the portfolio's routing config.
 * Use these instead of Next.js's built-in `Link`, `useRouter`, and `usePathname`
 * so that locale prefixes are handled automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
