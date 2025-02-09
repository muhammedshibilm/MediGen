import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function GET() {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL('https://facenbodycare.com/feed/');
   if (!feed) {
      console.log("Error occured") 
   } 

   
   const items =  feed["items"].map((items)=>{
      return items;
    });

    
    const image = (img: string) =>{
        const imagereg = /src="(.*?)\"/
        if (!img) {
            return " ";
        }

        const match = img.match(imagereg);
        if (match) {
            return match[1];
        }
        return "No image url founded";
    } 
     
  
    const description = (items: string) =>{
      const desctiptionreg = /<p>(.*?)<\/p>/ 
      if (!items) {
         return " "
      }

      const match = items.match(desctiptionreg);
  
      if (match) { return match[1]; }

      return "NO data available"; 

    }


    const healthtipsJson =  items.map((items)=>{
      return {
         "title": items["title"],
         "description": description(items["content:encoded"]),
         "image":  image(items["content:encoded"]),
         "link" : items["link"]
      }
    }) ;

    return NextResponse.json({"message": healthtipsJson }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
}
