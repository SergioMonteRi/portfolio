import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import "../globals.css";

/**
 * Syne — bold geometric display font for headings and body text.
 * Distinctive editorial character that stands apart from generic sans-serifs.
 */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * JetBrains Mono — monospace font for labels, metadata and technical text.
 * Loaded with latin subset to optimize bundle size.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** Statically renders one page per supported locale at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Generates locale-aware metadata for the page.
 *
 * @param params - Route params containing the current locale.
 * @returns Metadata object with translated title and description.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

/**
 * Locale-aware root layout.
 *
 * Sets the `lang` attribute on `<html>` to the active locale, wraps the
 * tree with `NextIntlClientProvider` so client components can access
 * translations, and renders the global `Navbar`.
 *
 * @param children - The page content rendered inside the layout.
 * @param params - Route params containing the current locale.
 * @returns The root HTML shell with fonts, dark theme, and i18n provider.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
