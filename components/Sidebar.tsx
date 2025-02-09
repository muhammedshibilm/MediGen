"use client";

import { checkAuth } from "@/utils/auth";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Contact,
  HomeIcon,
  LogIn,
  LogOut,
  MessageSquare,
  Settings,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", { method: "GET" });
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.error || "Something went wrong");
    }
    toast.success(data.message || "Logout successful");
    window.location.reload();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Failed to log out");
  }
};

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  useEffect(() => {
    checkAuth().then(setIsAuthenticated);
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { method: "GET" });
        const data = await res.json();
        if (res.ok) {
          setIsAuthenticated(true);
          setUser(data);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
        ease: "easeInOut",
      },
    }),
  };

  const menuItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/chat", icon: MessageSquare, label: "Chat" },
    { href: "/doctor-contact", icon: Contact, label: "Contact" },
    { href: "/document-upload", icon: Upload, label: "Upload" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Tooltip.Provider>
      <div
        className={`fixed top-0 left-0 h-screen bg-[#111624] z-50 transition-all duration-300 hidden md:block ${
          open ? "w-52" : "w-14"
        }`}
      >
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

        <div className="text-white flex flex-col justify-around h-full">
          <ul className="space-y-4">
            {menuItems.map((item, i) => (
              <motion.li
                key={item.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="flex items-center gap-4 px-4 cursor-pointer"
              >
                <Link href={item.href}>
                  <item.icon />
                </Link>
                {open && <Link href={item.href}>{item.label}</Link>}
              </motion.li>
            ))}
          </ul>

          <ul className="space-y-4">
            {isAuthenticated ? (
              <motion.li
                custom={menuItems.length}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="flex items-center gap-4 px-4 cursor-pointer"
                onClick={logout}
              >
                <LogOut color="red" />
                {open && <p>Logout</p>}
              </motion.li>
            ) : (
              <motion.li
                custom={menuItems.length}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="flex items-center gap-4 px-4 cursor-pointer"
              >
                <Link href="/login">
                  <LogIn />
                </Link>
                {open && <Link href="/login">Login</Link>}
              </motion.li>
            )}
          </ul>

          {user && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              custom={menuItems.length + 1}
              className="text-black bg-white flex justify-between"
            >
              <div className="text-white bg-[#070b14] h-full w-full flex-1 flex justify-center items-center text-3xl py-4">
                {user?.username.substring(0, 1)}
              </div>
              {open && user && (
                <p className="truncate p-2 flex-2">
                  {user.username.toUpperCase()} <br />
                  <span className="text-sm">{user.email}</span>
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Tooltip.Provider>
  );
}