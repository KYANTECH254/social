// app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from 'next/font/google';
import "./globals.css";
import "../public/styles/main.css"
import "../public/styles/static.css"
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from 'sonner';

const notoSans = Nunito({
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
    <html lang="en" className="">
      <body className={notoSans.className}>
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            classNames: {
              toast: 'alert',
            }
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
