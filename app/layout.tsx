// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans } from '@next/font/google';
import "./globals.css";
import "../public/styles/main.css"
import "../public/styles/static.css"

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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
      <body className={notoSans.className}>
        {children}
      </body>
    </html>
  );
}
