import newsimg1 from "@/public/images/newsimg1.jpg";
import newsimg2 from "@/public/images/newsimg2.jpg";
import newsimg3 from "@/public/images/newsimg3.jpg";
import newsimg4 from "@/public/images/newsimg4.jpg";
import tipimg1 from "@/public/images/tipimg1.jpg";
import tipimg2 from "@/public/images/tipimg2.jpg";
import tipimg3 from "@/public/images/tipimg3.jpg";
import docimg1 from "@/public/images/docimg1.png";
import docimg2 from "@/public/images/docimg2.jpg";
import docimg3 from "@/public/images/docimg3.jpg";
import docimg4 from "@/public/images/docimg4.jpg";
import { StaticImageData } from "next/image";

const images: {[key: string]: StaticImageData} = {
  "/newsimg1.jpg": newsimg1,
  "/newsimg2.jpg": newsimg2,
  "/newsimg3.jpg": newsimg3,
  "/newsimg4.jpg": newsimg4,
  "/tipimg1.jpg": tipimg1,
  "/tipimg2.jpg": tipimg2,
  "/tipimg3.jpg": tipimg3,
  "/docimg1.png": docimg1,
  "/docimg2.png": docimg2,
  "/docimg3.png": docimg3,
  "/docimg4.png": docimg4,
};

export default images;
