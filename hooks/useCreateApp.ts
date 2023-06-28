import { T_APP } from '@/types/global';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

async function addItem(
  data: T_APP,
) {
  const token = Cookies.get('p_token');
  const res = await fetch(
    `/api/app`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    },
  );
  return res.json();
}

function useCreateApp() {
  const query = useMutation(
    (data: T_APP) =>
    addItem(data),
  );

  return query;
}

export default useCreateApp;
