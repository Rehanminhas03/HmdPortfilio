import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hammad Ayub — Head of Media & Marketing",
  description:
    "Hammad Ayub — Head of Media & Marketing, Brand Strategist & AI Creative Producer based in Islamabad, Pakistan. Cinematic content, brand strategy, and performance marketing across steel, automotive, EV, real estate, and AI advertising.",
  openGraph: {
    title: "Hammad Ayub — Head of Media & Marketing",
    description:
      "Brand Strategist & AI Creative Producer. Cinematic content, brand strategy, and performance marketing across B2B and B2C markets.",
    type: "website",
    locale: "en_US",
    siteName: "Hammad Ayub",
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
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-white font-inter">
        {children}
      </body>
    </html>
  );
}
