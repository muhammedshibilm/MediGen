import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat",
    description: "This is the Chating with Ai page",
  };

export default function Layout({ children }: { children: React.ReactNode }) {

      

  return (
    <div>
      {children}
    </div>
  );
}