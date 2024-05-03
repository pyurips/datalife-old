import { useRequester } from './use_requester';

export function auth_signInTest(): {
  data: { error: string } | undefined;
  fetch: () => void;
  loading: boolean;
} {
  return useRequester('client', 'auth_signinTest', false);
}
