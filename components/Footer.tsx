import { Copyright, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="  pt-10 ">
      {/* top */}
      <div className=" flex w-full justify-between container  mx-auto pb-5">
        <h1 className="font-bold text-2xl hidden md:block" style={{ letterSpacing: 2 }}>
          MEDiGEN
        </h1>
        <div>
          <ul className="flex md:space-x-11 justify-around md:justify-center  w-screen  md:w-fit ">
            <li>About</li>
            <li>Help Center</li>
            <li>Contact us</li>
            <li>FaQs</li>
          </ul>
        </div>
      </div>
      {/* bottom */}
      <div className="border-t-2 border-white flex  justify-between items-center px-10 py-5 flex-col  md:flex-row">
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
        <div className="flex gap-5 mt-5 md:m-0">
          <Twitter />
          <Facebook />
          <Linkedin />
          <Youtube />
        </div>
      </div>
    </footer>
  );
};
