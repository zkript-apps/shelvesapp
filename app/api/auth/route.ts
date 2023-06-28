import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const res = await request.json();
  const requiredKeys = ["email","password"];
  let loginUser = null;
  if(verifyRequiredKeys(requiredKeys, res)) {
    try {
      const user = await prisma.user.findFirst({ where: { email: res.email } });
      const decryptedPassword = user ? CryptoJS.AES.decrypt(
        user.password,
        process.env.ENCRYPT_KEY as string
      ) : null;
      const originalPasswordFromDB = decryptedPassword ? decryptedPassword.toString(CryptoJS.enc.Utf8) : null;
      if(user && originalPasswordFromDB && res.password === originalPasswordFromDB) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: '6h' }
        )
        loginUser = { success: true, token };
      } else {
        loginUser = { success: false, message: "Email or password is wrong" };
      }
    } catch (e) {
      loginUser = getPrismaError(e);
    } 
  } else {
    loginUser = { success: false, message: "Required fields are empty" };
  }

  return NextResponse.json(loginUser);
}
