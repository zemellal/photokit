import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "PhotoKit",
//   description:
//     "PhotoKit is your kit builder for all your Camera and Lens GAS needs!",
// };

export default function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen w-full">{children}</div>;
}
