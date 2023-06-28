import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export async function getAppsCount(
    token: string,
) {
    const res = await fetch(
        `/api/app/count`,
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

function useGetAppsCount() {
    const token = Cookies.get('p_token');
    const query = useQuery(
        ['itemsCount'],
        () =>
            getAppsCount(
                token as string,
            ),
        {
            enabled: token != null,
            refetchOnWindowFocus: false,
        },
    );

    return query;
}

export default useGetAppsCount;
