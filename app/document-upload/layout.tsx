import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Document upload",
    description: "This is the documents upload page section",
  };

export default function Layout({ children }: { children: React.ReactNode }) {

      

  return (
    <div>
      {children}
    </div>
  );
}