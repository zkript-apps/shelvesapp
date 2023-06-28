import { Prisma } from "@prisma/client";

const getPrismaError = (e: any) => {
    let error = null;
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
            error = "User information must be unique";
        } else {
            error = `Error code ${e.code}`;
        }
    } else {
        error = `Unknown error found`;
    }
    return error;
};

export default getPrismaError;
