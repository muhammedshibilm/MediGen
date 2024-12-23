import { Navbar } from "@/components/navbar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home",
  description: "This is the home page",
};

export default function Home() {
  return (
     <>
      <Navbar />
       its home page
     </>
  );
}
