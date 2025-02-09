import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function GET() {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL("https://alternativemedicine.com/feed/");

    if (!feed) {
      console.log("Error occured");
    }

    const items = feed["items"].map((items) => {
      return items;
    });

    const result = items.map((data, index) => {
      const description = items[index]["contentSnippet"]!.split("Read More")[0];
      const image = items[1]["content:encoded"].match(/src="(.*?)\"/);

      return {
        titile: data["title"],
        links: data["link"],
        description: description,
        image: image[1],
      };
    });

    return NextResponse.json({ "message": result }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
}
