import type { Metadata } from "next";
import { Noto_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PhotoKit",
  description: "PhotoKit is your kit builder for all your GAS needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
