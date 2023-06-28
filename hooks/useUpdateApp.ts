import { T_APP_UPDATE } from '@/types/global';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

async function updateItem(
  data: T_APP_UPDATE,
) {
  const token = Cookies.get('p_token');
  const res = await fetch(
    `/api/app`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    },
  );
  return res.json();
}

function useUpdateApp() {
  const query = useMutation(
    (data: T_APP_UPDATE) =>
    updateItem(data),
  );

  return query;
}

export default useUpdateApp;
