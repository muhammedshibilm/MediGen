import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "This is the Login page ",
  };

export default function Layout({ children }: { children: React.ReactNode }) {

      

  return (
    <div>
      {children}
    </div>
  );
}