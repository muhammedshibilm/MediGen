import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";



export const metadata: Metadata = {
  title: "MediGen App",
  description: "MediGen next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
         <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
