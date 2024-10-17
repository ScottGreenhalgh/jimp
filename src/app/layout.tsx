import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jimp",
  description: "Image Editing in the browser | Jimp",
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
