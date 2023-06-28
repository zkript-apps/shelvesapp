import AppEdit from "@/components/AppEdit"

export const metadata = {
    title: 'Shelves - Update',
    description: 'Shelves',
}

export default function UpdatePage({ params }: { params: { appId: number } }) {
    const appId = params.appId;
    return <AppEdit appId={appId} />
}
