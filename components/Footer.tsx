import { Copyright, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Footer = () => {
  return (
    <footer className="py-20">
      {/* top */}
      <div className=" flex w-full justify-between container mx-auto pb-5">
        <h1 className="font-bold text-2xl" style={{ letterSpacing: 2 }}>
          MEDiGEN
        </h1>
        <div>
          <ul className="flex space-x-11">
            <li>About</li>
            <li>Help Center</li>
            <li>Contact us</li>
            <li>FaQs</li>
          </ul>
        </div>
      </div>
      {/* bottom */}
      <div className="border-t-2 border-white flex justify-between px-10 py-5">
        <div>
          
        </div>

        <div>
          <ul className="flex gap-10">
            <li className="flex">
              <Copyright className="pr-2" /> MediGen, Inc
            </li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Site map</li>
          </ul>
        </div>
        <div className="flex gap-5">
          <Twitter />
          <Facebook />
          <Linkedin />
          <Youtube />
        </div>
      </div>
    </footer>
  );
};
