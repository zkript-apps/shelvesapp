import { ENUM_STATUS } from '@/types/global';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export async function getApps(
    token: string,
    type: ENUM_STATUS,
) {
    const res = await fetch(
        `/api/app/${type.toLowerCase()}`,
        {
            method: 'GET',
            next: { revalidate: 5 },
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        },
    );
    return res.json();
}

function useGetApps(type: ENUM_STATUS) {
    const token = Cookies.get('p_token');
    const query = useQuery(
        ['apps', type],
        () =>
            getApps(
                token as string,
                type,
            ),
        {
            enabled: token != null && !!type,
            refetchOnWindowFocus: false,
        },
    );

    return query;
}

export default useGetApps;
