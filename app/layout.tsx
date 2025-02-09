import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Head from "next/head";



export const metadata: Metadata = {
  title: "MediGen App - Home",
  description: "MediGen next app",
  manifest: "./manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111624" />
      </Head>
      <body
        className={`antialiased`}
      >
         <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
