import { T_AUTH_FORM } from '@/types/global';
import { useMutation } from '@tanstack/react-query';

async function register(
  { email, password }: T_AUTH_FORM,
) {
  const res = await fetch(
    `/api/user`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  return res.json();
}

function useLogin() {

  const query = useMutation(
    ({ email, password }: T_AUTH_FORM) =>
    register({ email, password }),
  );

  return query;
}

export default useLogin;
