import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "wves. — Full-Stack Developer",
  description:
    "Building digital experiences beyond the ordinary. Full-Stack Developer creating modern websites and digital platforms.",
  keywords: [
    "full-stack developer",
    "web developer",
    "portfolio",
    "wves",
    "react",
    "next.js",
  ],
  openGraph: {
    title: "wves. — Full-Stack Developer",
    description:
      "Building digital experiences beyond the ordinary.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] noise-overlay">
        {children}
      </body>
    </html>
  );
}
