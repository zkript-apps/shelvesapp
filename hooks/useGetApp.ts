import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export async function getApp(
    token: string,
    itemId: number,
) {
    const res = await fetch(
        `/api/app?appId=${itemId}`,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        },
    );
    return res.json();
}

function useGetApp(itemId: number) {
    const token = Cookies.get('p_token');
    const query = useQuery(
        ['app', itemId],
        () =>
            getApp(
                token as string,
                itemId,
            ),
        {
            enabled: token != null && !!itemId,
            refetchOnWindowFocus: false,
        },
    );

    return query;
}

export default useGetApp;
