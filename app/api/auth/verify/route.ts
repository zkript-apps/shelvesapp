import { NextResponse } from "next/server";
import verifyToken from "@/helpers/verifyToken";

export async function POST() {
  let verify = await verifyToken();
  return NextResponse.json(verify);
}
