import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./brand.css";
import "./rebuild.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "sapient-capital-holdings.example";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const siteUrl = `${protocol}://${host}`;
  const title = "Sapient Capital Holdings | One Gateway. Shared Progress. Pan-African Value.";
  const description = "Sapient Capital Holdings pools disciplined capital to build resilient businesses and assets that create generational value across Africa.";

  return {
    title: { default: title, template: "%s | Sapient Capital Holdings" },
    description,
    keywords: ["Pan-African holding company", "disciplined capital", "African business development", "strong governance", "strategic partnerships"],
    openGraph: { title, description, type: "website", url: siteUrl, images: [{ url: `${siteUrl}/og.png`, width: 1774, height: 887, alt: "Sapient Capital Holdings — Building Enduring African Enterprises" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.png`] },
    icons: { icon: "/sapient-emblem.png", shortcut: "/sapient-emblem.png" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
