import Loading from "@/app/loading";
import Image from "next/image";
import React, { Suspense } from "react";
import { Button } from "./ui/button";
import images from "../utils/images";

interface CardType {
  styletype: string;
  flexcol?: boolean;
  colored?: boolean;
}

interface Style {
  cardstyle: {
    width: string;
    height: string;
  };
  image: {
    width: number;
    height: number;
    display: string;
  };
  button: {
    text: string;
  };
}

type Styles = {
  [key: string]: Style;
};

interface Data {
  id: number;
  title: string;
  description: string;
  image?: string;
}

interface CardProps extends CardType {
  data: Data[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Cards = ({ styletype, flexcol, colored, data }: CardProps) => {
  const style: Styles = {
    healthnews: {
      cardstyle: {
        width: "w-[312px]",
        height: "h-min-[460px]",
      },
      image: {
        width: 260,
        height: 300,
        display: "block",
      },
      button: {
        text: "Read More",
      },
    },
   

    weekelyplan: {
      cardstyle: {
        width: "w-[312px]",
        height: "h-min-460px]",
      },
      image: {
        width: 260,
        height: 300,
        display: "none",
      },
      button: {
        text: "View Full Plan",
      },
    },

    featureddoctor: {
      cardstyle: {
        width: "w-[312px]",
        height: "h-min-[460px]",
      },
      image: {
        width: 260,
        height: 300,
        display: "block",
      },
      button: {
        text: "View Profile",
      },
    },
  };

  const cuttentstyle: Style = style[styletype];

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className={`cards bg-card-gradient ${
            cuttentstyle.cardstyle.width
          } ${
            cuttentstyle.cardstyle.height
          } rounded-lg mx-2  flex-shrink-0 flex   border shadow-lg shadow-gray-600  ${
            flexcol
              ? "flex-row  justify-around  items-center"
              : "flex-col justify-center items-center py-3"
          }`}
        >
          <Suspense fallback={<Loading />}>
            {cuttentstyle.image.display == "block" && item.image ? (
              <Image
                src={images[item.image]}
                width={cuttentstyle.image.width}
                height={cuttentstyle.image.height}
                alt={item.image}
                className={`w-full h-full  ${
                  flexcol ? "p-0 m-0 " : "p-4 rounded-3xl"
                }`}
              />
            ) : null}
          </Suspense>
          <div className="px-6  space-y-2">
            <h1 className=" text-white font-bold text-lg">{item.title}</h1>
            <p className="text-[#D6E0FF] font-normal">
             {item.description}
            </p>
            <Button className=" py-5  px-20 bg-custom-yellow text-custom-gray font-semibold w-full  hover:text-white">
              {" "}
              {cuttentstyle.button.text}{" "}
            </Button>
          </div>
        </div>
      ))}{" "}
    </>
  );
};
