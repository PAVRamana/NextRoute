import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { AccountsApi, Configuration } from 'sailpoint-api-client';

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);

  const apiConfig = new Configuration({
    baseurl: 'https://company9994-poc.api.identitynow-demo.com/',
    accessToken: session?.accessToken,
  });
  let api = new AccountsApi(apiConfig);
  const val = await api.listAccounts();
  console.log(val);
}
