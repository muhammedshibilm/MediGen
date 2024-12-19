import { NextResponse } from "next/server";

export  async function GET(){
    try {
       const response = NextResponse.json({"message": "Logout sucessfully"});
       response.cookies.delete("authToken");
       return response;
    } catch (error) {
       return NextResponse.json({"error": error});  
    }
}
    