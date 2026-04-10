import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lineage. Community Timelines",
  description:
    "Lineage is a new kind of social platform where people build personal timelines of their journey through a community. Together, those timelines form a collective history.",
  openGraph: {
    title: "Lineage. Community Timelines",
    description:
      "A new kind of social platform where personal timelines weave into a shared community history.",
    url: "https://lineage.community",
    siteName: "Lineage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lineage. Community Timelines",
    description:
      "A new kind of social platform where personal timelines weave into a shared community history.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
