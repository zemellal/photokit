import type { Metadata } from "next";
import { Noto_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PhotoKit",
  description:
    "PhotoKit is your kit builder for all your Camera and Lens GAS needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider delayDuration={250}>
            <div className="relative flex">
              <Sidebar />
              <main className="flex flex-col flex-1 min-h-screen sm:pl-14">
                {children}
              </main>
              <Toaster />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
