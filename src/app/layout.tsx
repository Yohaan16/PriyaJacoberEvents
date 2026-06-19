import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";

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
  title: "Priya Jacober Events | Making Every Moment Unforgettable",
  description:
    "Stress-free event planning for private, luxury & corporate occasions in Zurich. We organize birthdays, ladies' nights, luxury gatherings, corporate events, and more.",
  keywords: [
    "event planning",
    "Zurich events",
    "corporate events",
    "birthday party",
    "luxury events",
    "private events",
    "Switzerland",
    "Priya Jacober",
  ],
  openGraph: {
    title: "Priya Jacober Events | Making Every Moment Unforgettable",
    description:
      "Stress-free event planning for private, luxury & corporate occasions in Zurich.",
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
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
