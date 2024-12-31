"use client";

import { checkAuth } from "@/utils/auth";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Contact,
  HelpCircle,
  HomeIcon,
  LogIn,
  LogOut,
  MessageSquare,
  Settings,
  Upload,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Tooltip from "@radix-ui/react-tooltip";

const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", { method: "GET" });
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.error || "Something went wrong");
    }
    toast.success(data.message || "Logout successful");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  } catch (error) {
    toast.error("Failed to log out");
  }
};

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth().then(setIsAuthenticated);
  }, []);

  return (
    <Tooltip.Provider>
      {/* Above medium device  */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#121736] z-50 transition-all duration-500 hidden md:block ${
          open ? "w-48" : "w-14"
        }`}
      >
        {/* Sidebar Header */}
        <div className="text-white p-4 flex items-center justify-between">
          {open && (
            <h2 className="text-xl font-bold" style={{ letterSpacing: 2 }}>
              MEDiGEN
            </h2>
          )}
          {open ? (
            <ArrowLeftToLine
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <ArrowRightToLine
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        {/* Sidebar Content */}
        <div className="text-white flex flex-col justify-around h-full">
          {/* Navigation Links */}
          <ul className="space-y-4">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <li className="flex items-center gap-4 px-4 cursor-pointer">
                  <HomeIcon />
                  {open && <Link href={"/"}>Home</Link>}
                </li>
              </Tooltip.Trigger>
              {!open && <Tooltip.Content side="right">Home</Tooltip.Content>}
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <li className="flex items-center gap-4 px-4  cursor-pointer">
                  <MessageSquare />
                  {open && <Link href={"/chat"}>Chat</Link>}
                </li>
              </Tooltip.Trigger>
              {!open && <Tooltip.Content side="right">Chat</Tooltip.Content>}
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <li className="flex items-center gap-4 px-4  cursor-pointer">
                  <Contact />
                  {open && <Link href={"/doctor-contact"}>Contact</Link>}
                </li>
              </Tooltip.Trigger>
              {!open && <Tooltip.Content side="right">Contact</Tooltip.Content>}
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <li className="flex items-center gap-4 px-4 cursor-pointer">
                  <Upload />
                  {open && <Link href={"/document-upload"}>Upload</Link>}
                </li>
              </Tooltip.Trigger>
              {!open && <Tooltip.Content side="right">Upload</Tooltip.Content>}
            </Tooltip.Root>
          </ul>

          {/* Secondary Links */}
          <ul className="space-y-4">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <li className="flex items-center gap-4 px-4  cursor-pointer">
                  <Settings />
                  {open && <Link href={"/settings"}>Settings</Link>}
                </li>
              </Tooltip.Trigger>
              {!open && (
                <Tooltip.Content side="right">Settings</Tooltip.Content>
              )}
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <li className="flex items-center gap-4 px-4 cursor-pointer">
                  <HelpCircle />
                  {open && <Link href={"/help"}>Help</Link>}
                </li>
              </Tooltip.Trigger>
              {!open && <Tooltip.Content side="right">Help</Tooltip.Content>}
            </Tooltip.Root>
          </ul>

          {/* Auth Links */}
          <ul className="space-y-4">
            {isAuthenticated ? (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <li
                    className="flex items-center gap-4 px-4  cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut />
                    {open && <p>Logout</p>}
                  </li>
                </Tooltip.Trigger>
                {!open && (
                  <Tooltip.Content side="right">Logout</Tooltip.Content>
                )}
              </Tooltip.Root>
            ) : (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <li className="flex items-center gap-4 px-4  cursor-pointer">
                    <LogIn />
                    {open && <Link href={"/login"}>Login</Link>}
                  </li>
                </Tooltip.Trigger>
                {!open && <Tooltip.Content side="right">Login</Tooltip.Content>}
              </Tooltip.Root>
            )}
          </ul>

          {/* Footer */}
          <div className=" text-black bg-white py-4 px-4 flex items-center gap-4">
            <User2Icon />
            {open && <p className="truncate text-sm">example@gmail.com</p>}
          </div>
        </div>
      </div>

      {/* Mobile Device */}
      <div className="fixed   w-full px-5 bottom-10  z-50 block md:hidden">
        <div className="flex justify-around p-5  bg-[#121736] rounded-full ">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <HomeIcon  href={"/"} />
            </Tooltip.Trigger>
            <Tooltip.Content side="top">Home</Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <MessageSquare  href={"/chat"}/>
            </Tooltip.Trigger>
            <Tooltip.Content side="top">Chat</Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Contact href={"/doctor-contact"} />
            </Tooltip.Trigger>
            <Tooltip.Content side="top">Contact</Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Upload href={"/document-upload"} />
            </Tooltip.Trigger>
            <Tooltip.Content side="top">Upload</Tooltip.Content>
          </Tooltip.Root>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
