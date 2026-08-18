import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { DevtoolsGreeting } from "@/components/util/DevtoolsGreeting";
import { FilmGrain } from "@/components/util/FilmGrain";
import { StoryCanvas } from "@/components/scene/StoryCanvas";
import { CommandPalette } from "@/components/nav/CommandPalette";
import { contact } from "@/data/contact";
import "./globals.css";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: contact.name,
  jobTitle: "Software Engineer",
  description:
    "Software engineer building large-scale distributed systems and data infrastructure. Nearly four years at LinkedIn on metadata systems processing hundreds of millions of events every day.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  email: `mailto:${contact.email}`,
  url: "https://rakhi.vercel.app",
  sameAs: contact.socials.map((s) => s.href),
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Arizona State University",
    },
  ],
  memberOf: [
    {
      "@type": "Organization",
      name: "LinkedIn",
      url: "https://linkedin.com",
      // Past-affiliation — Rakhi worked at LinkedIn Jan 2023 – Jun 2026.
    },
  ],
  knowsAbout: [
    "Distributed Systems",
    "Apache Kafka",
    "Apache Flink",
    "MySQL",
    "Metadata Systems",
    "Reliability Engineering",
    "Data Infrastructure",
  ],
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rakhi.vercel.app"),
  title: {
    default: "Rakhi Agrawal — Software Engineer",
    template: "%s · Rakhi Agrawal",
  },
  description:
    "Software engineer building large-scale distributed systems and data infrastructure. Nearly four years at LinkedIn on metadata systems.",
  openGraph: {
    title: "Rakhi Agrawal — Software Engineer",
    description:
      "Distributed systems, streaming data platforms, reliability engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakhi Agrawal — Software Engineer",
    description: "Distributed systems, streaming data, reliability.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#top" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <StoryCanvas />
        {children}
        <FilmGrain />
        <CommandPalette />
        <DevtoolsGreeting />
      </body>
    </html>
  );
}
