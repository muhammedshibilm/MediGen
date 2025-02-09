"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface RssItem {
  title: string;
  link: string;
  description: string;
  image: string;
}

export default function NewsCard() {
  const [data, setData] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch("/api/news");
        const result = await response.json();
        setData(result.message);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center   my-6">Health News</h1>
      {loading ? (
        <ul className="flex gap-6 overflow-x-auto w-screen p-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <li
                key={index}
                className="flex flex-col flex-shrink-0 w-[400px] bg-gray-200 animate-pulse rounded-lg p-4 border border-gray-300 space-y-4"
              >
                <div className="w-full h-[200px] bg-gray-300 rounded-lg"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-10 bg-gray-400 rounded w-full"></div>
              </li>
            ))}
        </ul>
      ) : (
        <ul className="flex gap-6 overflow-x-auto w-screen p-4">
          {data.slice(0, 4).map((item, index) => (
            <motion.li
             
              initial={{
                scale: 1
              }}

              whileHover={{
                scale: 1.02,
                transition:{
                  duration: 0.2
                }
              }}
              key={index}
              className="flex flex-col flex-shrink-0 justify-evenly w-[400px] bg-[#DACAA4] shadow-md rounded-lg p-4 border border-gray-200 space-y-4"
            >
              <div className="flex justify-center items-center">
                <Image
                  alt="news pngs"
                  src={item.image}
                  width={300}
                  height={50}
                  className="rounded-lg object-cover"
                />
              </div>
              <h1 className="text-black font-bold text-xl">{item.title}</h1>
              <p className="text-gray-500 font-semibold mt-2">
                {item.description}
              </p>
              <Link
                href={item.link}
                target="_blank"
               
                className="mt-4"
              >
                <Button className="w-full py-5">Read More</Button>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-6">
        <Button className="text-xl w-96 bg-[#DACAA4]">See more</Button>
      </div>
    </div>
  );
}
