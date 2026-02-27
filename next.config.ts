import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = withNextIntl({
  reactCompiler: true,
});

export default nextConfig;
