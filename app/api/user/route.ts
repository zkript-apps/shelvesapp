import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import CryptoJS from 'crypto-js';
import getPrismaError from "@/helpers/getPrismaError";
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const res = await request.json();
  const requiredKeys = ["email","password"];
  let createUser = null;
  if(verifyRequiredKeys(requiredKeys, res)) {
    const encryptedPassword = CryptoJS.AES.encrypt(res.password, process.env.ENCRYPT_KEY as string).toString();
    res.password = encryptedPassword;
    try {
      createUser = await prisma.user.create({
        data: res
      })
    } catch (e) {
      createUser = getPrismaError(e);
    } 
  } else {
    createUser = "Required fields are empty";
  }

  return NextResponse.json(createUser);
}
