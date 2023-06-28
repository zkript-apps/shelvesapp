import { useMutation } from '@tanstack/react-query';

async function authVerify(
  { token }: { token: string },
) {
  const res = await fetch(
    `/api/auth/verify`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    },
  );
  return res.json();
}

function useAuthVerify() {

  const query = useMutation(
    ({ token }: { token: string }) =>
    authVerify({ token }),
  );

  return query;
}

export default useAuthVerify;
