import { CACHE_REVALIDATE } from "@/helpers/constants";

// SERVER COMPONENTS REQUEST
async function getItems(type: 'ongoing' | 'completed') {
    const res = await fetch(`${process.env.WEB_URL}/api/item/${type}`, {
        next: { revalidate: CACHE_REVALIDATE },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default getItems;