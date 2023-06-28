import { CACHE_REVALIDATE } from "@/helpers/constants";

// SERVER COMPONENTS REQUEST
async function getItemsCount() {
    const res = await fetch(`${process.env.WEB_URL}/api/item/count`, {
        next: { revalidate: CACHE_REVALIDATE },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default getItemsCount;