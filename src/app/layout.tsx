import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priya Jacober Events | Event Planning in Zurich, Switzerland",
  description:
    "Professional event planning in Zurich. We organize birthdays, corporate events, destination events, private parties, and more. Stress-free, personal, and reliable.",
  keywords: [
    "event planning",
    "Zurich events",
    "corporate events",
    "birthday party",
    "destination events",
    "Switzerland",
    "Priya Jacober",
  ],
  openGraph: {
    title: "Priya Jacober Events | Events Made Easy for Everyone",
    description:
      "We plan and coordinate events that fit your style, your budget, and your life.",
    type: "website",
    locale: "en_CH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
