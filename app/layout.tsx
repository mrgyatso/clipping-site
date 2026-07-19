import type { Metadata } from "next";
import {
  DM_Sans,
  Instrument_Serif,
  Newsreader,
  Space_Mono,
} from "next/font/google";
import { Analytics } from "@/components/interactive";
import { siteConfig } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-space-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Guaranteed Verified Views | ClipWave",
    template: "%s | ClipWave",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Guaranteed Verified Views | ClipWave",
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guaranteed Verified Views | ClipWave",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${newsreader.variable} ${spaceMono.variable} ${instrumentSerif.variable} ${dmSans.className}`}
      >
        <script
          dangerouslySetInnerHTML={{
            // Hiding .reveal content is safe only while something is guaranteed to
            // un-hide it. RevealManager clears this timer once its observer is live;
            // if it never mounts, everything still becomes visible.
            __html: `document.documentElement.classList.add("js");
window.__revealFailsafe=setTimeout(function(){var e=document.querySelectorAll(".reveal");for(var i=0;i<e.length;i++)e[i].classList.add("in")},2500)`,
          }}
        />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        {children}
      </body>
    </html>
  );
}
