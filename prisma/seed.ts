import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'
const prisma = new PrismaClient()

async function main() {
  const encryptedPassword1 = CryptoJS.AES.encrypt("@Admin123", process.env.ENCRYPT_KEY as string).toString();
  const encryptedPassword2 = CryptoJS.AES.encrypt("@Patrick22", process.env.ENCRYPT_KEY as string).toString();
  const defaultAdmin = await prisma.user.upsert({
    where: { email: 'admin@shelvesapps.info' },
    update: {},
    create: {
      email: 'admin@shelvesapps.info',
      password: encryptedPassword1,
      role: 'ADMIN'
    },
  })
  const defaultDev = await prisma.user.upsert({
    where: { email: 'jpmadrigal@shelvesapps.info' },
    update: {},
    create: {
      email: 'jpmadrigal@shelvesapps.info',
      password: encryptedPassword2,
      role: 'DEV'
    },
  })
  console.log({ defaultAdmin, defaultDev })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })