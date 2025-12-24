 import { NextRequest, NextResponse } from "next/server";
 
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
 
 export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ path: string[] }> }
 ) {
   const { path } = await params;
   const endpoint = "/" + path.join("/");
   const searchParams = request.nextUrl.searchParams.toString();
   const url = `${API_BASE_URL}${endpoint}${searchParams ? `?${searchParams}` : ""}`;
 
   try {
     const res = await fetch(url, {
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
       },
       cache: "no-store",
     });
 
     const data = await res.json();
     return NextResponse.json(data, { status: res.status });
   } catch (error) {
     console.error("Proxy error:", error);
     return NextResponse.json(
       { success: false, message: "Failed to fetch from API" },
       { status: 500 }
     );
   }
 }
 
 export async function POST(
   request: NextRequest,
   { params }: { params: Promise<{ path: string[] }> }
 ) {
   const { path } = await params;
   const endpoint = "/" + path.join("/");
   const url = `${API_BASE_URL}${endpoint}`;
   const body = await request.json();
 
   try {
     const res = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
       },
       body: JSON.stringify(body),
     });
 
     const data = await res.json();
     return NextResponse.json(data, { status: res.status });
   } catch (error) {
     console.error("Proxy error:", error);
     return NextResponse.json(
       { success: false, message: "Failed to fetch from API" },
       { status: 500 }
     );
   }
 }
