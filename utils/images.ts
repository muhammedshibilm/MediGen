import docimg1 from "@/public/images/docimg1.png";
import docimg2 from "@/public/images/docimg2.jpg";
import docimg3 from "@/public/images/docimg3.jpg";
import docimg4 from "@/public/images/docimg4.jpg";
import { StaticImageData } from "next/image";

const images: {[key: string]: StaticImageData} = {

  "/docimg1.png": docimg1,
  "/docimg2.png": docimg2,
  "/docimg3.png": docimg3,
  "/docimg4.png": docimg4,
};

export default images;
