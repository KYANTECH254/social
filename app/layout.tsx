import type { Metadata } from "next";
import { Noto_Sans } from '@next/font/google';
import "./globals.css";
import "../public/styles/main.css"
import "../public/styles/static.css"

const notoSans = Noto_Sans({
  subsets: ['latin'], // Add more subsets like 'cyrillic', 'greek' if needed
  weight: ['400', '700'], // Choose weights (e.g., 400 for normal, 700 for bold)
  style: ['normal', 'italic'], // Include styles if needed
});

export const metadata: Metadata = {
  title: "MyApp",
  description: "Social App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
