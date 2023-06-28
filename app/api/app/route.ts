import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getPrismaError from "@/helpers/getPrismaError";
import verifyToken from "@/helpers/verifyToken";
import verifyRequiredKeys from "@/helpers/verifyRequiredKeys";
import verifyAllowedKeys from "@/helpers/verifyAllowedKeys";
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('appId');
    let item = null;
    const auth = await verifyToken();
    if (typeof auth === 'object') {
        if(itemId) {
            try {
                item = await prisma.app.findFirst({
                    where: {
                        id: Number(itemId),
                        deletedAt: undefined
                    },
                })
            } catch (e) {
                item = getPrismaError(e);
            }
        } else {
            try {
                item = await prisma.app.findMany({
                    where: {
                        deletedAt: undefined
                    },
                })
            } catch (e) {
                item = getPrismaError(e);
            }
        }
    } else {
        item = auth;
    }

    return NextResponse.json(item)
}

export async function POST(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let createItem = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "name",
            "redirectLink",
            "playStoreUrl",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                createItem = await prisma.app.create({
                    data: {
                        name: res.name,
                        redirectLink: res.redirectLink,
                        playStoreUrl: res.playStoreUrl,
                        creatorId: auth.id,
                    }
                })
            } catch (e) {
                createItem = getPrismaError(e);
            }
        } else {
            createItem = "Required fields are empty";
        }
    } else {
        createItem = auth;
    }
    return NextResponse.json(createItem);
}

export async function PATCH(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let updateItem = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "id",
        ];
        const allowedKeys = [
            "name",
            "redirectLink",
            "enabled",
            "playStoreUrl",
            "status",
        ];
        const updatedDataKey = { ...res };
        delete updatedDataKey.id;
        delete updatedDataKey.creatorId;
        if (verifyAllowedKeys(allowedKeys, updatedDataKey) && verifyRequiredKeys(requiredKeys, res)) {
            try {
                updateItem = await prisma.app.update({
                    where: {
                        id: res.id,
                    },
                    data: updatedDataKey,
                })
            } catch (e) {
                updateItem = getPrismaError(e);
            }
        } else {
            updateItem = "Some values are not allowed or missing";
        }
    } else {
        updateItem = auth;
    }
    return NextResponse.json(updateItem);
}


export async function DELETE(request: Request) {
    const res = await request.json();
    const auth = await verifyToken();
    let deleteItem = null;
    if (typeof auth === 'object') {
        const requiredKeys = [
            "id",
        ];
        if (verifyRequiredKeys(requiredKeys, res)) {
            try {
                deleteItem = await prisma.app.update({
                    where: {
                        id: res.id,
                    },
                    data: {
                        deletedAt: new Date(),
                    },
                })
            } catch (e) {
                deleteItem = getPrismaError(e);
            }
        } else {
            deleteItem = "Required fields are empty";
        }
    } else {
        deleteItem = auth;
    }
    return NextResponse.json(deleteItem);
}

