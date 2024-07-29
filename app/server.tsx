import { getServerSession } from 'next-auth';
import { AccountsApi, Configuration } from 'sailpoint-api-client';
import { authOptions } from './lib/auth';

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);

  const apiConfig = new Configuration({
    baseurl: 'https://company9994-poc.api.identitynow-demo.com/',
    accessToken: session?.accessToken,
  });
  let api = new AccountsApi(apiConfig);
  const val = await api.listAccounts();
}
