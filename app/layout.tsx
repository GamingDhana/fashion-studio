import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loomé — AI Fashion & Custom Tailoring",
  description:
    "Design your dream outfit with AI, customize every detail, and have it tailored for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}