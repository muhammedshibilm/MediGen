import Loading from "@/app/loading";
import Image from "next/image";
import React, { Suspense } from "react";
import img from "@/public/images/tipimg1.jpg";
import { Button } from "./ui/button";

interface CardType{
   styletype : string
   flexcol? : boolean
   colored? : boolean
}

interface Style {
    cardstyle: {
     width: string
     height:  string
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
  

export const Cards = ({styletype, flexcol, colored }: CardType) =>{
    const style: Styles = {
        "healthnews" :{
            
            "cardstyle":{
                "width": "w-[312px]",
                "height": "h-min-[460px]"
            }
            ,
            "image": {
                "width": 260,
                "height": 300,
                "display": "block"
            },
            "button":{
                "text": "Read More"
            }


        },
        "healthtips" :{

             
            "cardstyle":{
                "width": "w-[500px]",
                "height": "h-[200px]"
            }
            ,
            
            "image": {
                "width": 310,
                "height": 24,
                "display": "block"
            },
            "button":{
                "text": "Watch Video"
            }


        },

        "weekelyplan" :{
             
            "cardstyle":{
                "width": "w-[312px]",
                "height": "h-min-460px]"
            }
            ,
            "image": {
                "width": 260,
                "height": 300,
                "display": "none"
            },
            "button":{
                "text": "View Full Plan"
            }


        },

        "featureddoctor" :{
             
            "cardstyle":{
                "width": "w-[312px]",
                "height": "h-min-[460px]"
            }
            ,
            "image": {
                "width": 260,
                "height": 300,
                "display": "block"
            },
            "button":{
                "text": "View Profile"
            }

        },
    }

    const cuttentstyle:Style = style[styletype];
    return(
        <div className={`cards ${colored? 'bg-[#DACAA4]': 'bg-white'} ${cuttentstyle.cardstyle.width} ${cuttentstyle.cardstyle.height} rounded-lg mx-2  flex-shrink-0 flex   border shadow-lg shadow-gray-600  ${flexcol? "flex-row  justify-around  items-center": "flex-col justify-center items-center py-3"}`}>
            <Suspense fallback={<Loading/>}>
                {
                    cuttentstyle.image.display == "block" ? <Image src={img} alt="tipimg1" className={`w-full h-full  ${flexcol? "p-0 m-0 ": "p-4 rounded-3xl"}`} /> : null
                }
            </Suspense>
            <div className="px-6  space-y-2">
              <h1 className=" text-black font-bold text-lg">Vaccine updates</h1>
              <p className="text-gray-500 font-normal">New vaccines for this flu season are now available.</p>
              <Button className="border-2 border-blue-700 py-5  px-20 bg-white text-black font-semibold w-full"> {cuttentstyle.button.text} </Button>
            </div>
        </div>
    );
}