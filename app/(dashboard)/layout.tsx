import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "PhotoKit",
  description:
    "PhotoKit is your kit builder for all your Camera and Lens GAS needs!",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex">
      <Sidebar />
      <main className="flex flex-col flex-1 min-h-screen sm:pl-14">
        {children}
      </main>
    </div>
  );
}
