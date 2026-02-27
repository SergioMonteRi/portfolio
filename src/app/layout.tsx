import type { ReactNode } from "react";

/**
 * Minimal root layout required by Next.js App Router.
 * The locale-specific layout at `[locale]/layout.tsx` provides
 * the actual `<html>` and `<body>` shells.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
