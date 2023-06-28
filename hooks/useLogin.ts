import { useMutation } from '@tanstack/react-query';

type Props = {
    email: string;
    password: string;
};

async function login(
  { email, password }: Props,
) {
  const res = await fetch(
    `/api/auth`,
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
    ({ email, password }: Props) =>
    login({ email, password }),
  );

  return query;
}

export default useLogin;
