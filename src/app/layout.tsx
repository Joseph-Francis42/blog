import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beyond UI Blog - Insights, Figma & React Architecture",
  description: "Discover standard-setting guides, design token strategies, Next.js tutorials, and Frontend engineering insights from the creators of the Beyond UI design system.",
  keywords: ["design system", "nextjs", "react query", "figma", "tailwind css", "web development", "UI/UX design"],
  authors: [{ name: "Beyond UI Team", url: "https://beyondui.design" }],
  openGraph: {
    title: "Beyond UI Blog - Insights, Figma & React Architecture",
    description: "Discover standard-setting guides, design token strategies, Next.js tutorials, and Frontend engineering insights from the creators of the Beyond UI design system.",
    type: "website",
    locale: "en_US",
    url: "https://beyondui.design/blog",
    siteName: "Beyond UI Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond UI Blog - Insights, Figma & React Architecture",
    description: "Discover standard-setting guides, design token strategies, Next.js tutorials, and Frontend engineering insights from the creators of the Beyond UI design system.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
