import { redirect } from 'next/navigation'
const minutes = 15;
const CACHE_REVALIDATE = 60*minutes;

export const metadata = {
    title: 'Shelves - App',
    description: 'Shelves',
}

async function getRedirectLink(id: number) {
    const res = await fetch(`${process.env.WEB_URL}/api/app/redirect/${id}`, {
        next: { revalidate: CACHE_REVALIDATE },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}


export default async function ShelvePage({ params }: { params: { appId: number } }) {
    const appId = params.appId;
    const redirectLink = await getRedirectLink(appId);
    if (redirectLink) {
        redirect(redirectLink)
    }
    return (
        <main className="flex justify-center">
            <h3 className="p-4">Something went wrong. Please contact the administrators.</h3>
        </main>
    );
}
