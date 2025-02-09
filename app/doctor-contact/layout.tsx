import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Doctor",
    description: "This is the user can contact doctor page ",
  };

export default function Layout({ children }: { children: React.ReactNode }) {

      

  return (
    <div>
      {children}
    </div>
  );
}