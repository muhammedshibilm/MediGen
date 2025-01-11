import { NextRequest, NextResponse } from "next/server";
import { createCanvas } from "canvas";

interface AppointmentData {
  name: string;
  contactinfo: string;
  medicalcon: string;
  preferdate: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, contactinfo, medicalcon, preferdate }: AppointmentData = await req.json();

    if (!name || !contactinfo || !medicalcon || !preferdate) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const ticketImage = await generateTicketImage({ name, contactinfo, medicalcon, preferdate });

    return new NextResponse(ticketImage, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "attachment; filename=appointment-ticket.png",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function generateTicketImage(data: AppointmentData): Promise<Buffer> {
  const { name, contactinfo, medicalcon, preferdate } = data;

  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 600, 400);

  ctx.fillStyle = "#333333";
  ctx.font = "bold 20px Arial";
  ctx.fillText("Appointment Ticket", 200, 50);

  ctx.fillStyle = "#000000";
  ctx.font = "16px Arial";
  ctx.fillText(`Name: ${name}`, 50, 120);
  ctx.fillText(`Contact Info: ${contactinfo}`, 50, 150);
  ctx.fillText(`Medical Concern: ${medicalcon}`, 50, 180);
  ctx.fillText(`Preferred Date/Time: ${preferdate}`, 50, 210);

  return canvas.toBuffer("image/png");
}
