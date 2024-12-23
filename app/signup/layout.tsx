import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "This is the Signup page ",
  };

export default function Layout({ children }: { children: React.ReactNode }) {

      

  return (
    <div>
      {children}
    </div>
  );
}