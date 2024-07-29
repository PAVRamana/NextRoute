import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';
import { NextAuthOptions } from 'next-auth';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
  providers: [
    SailPointProvider({
      baseUrl: process.env.ISC_BASE_URL!,
      apiUrl: process.env.ISC_BASE_API_URL!,
      clientId: process.env.ISC_CLIENT_ID!,
      clientSecret: process.env.ISC_CLIENT_SECRET!,
      scope: 'sp:scopes:all',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // First login

      if (account && user && profile) {
        token.accessToken = account.access_token;
        token.id = profile.id;
        token.tenant = profile.tenant;
        token.displayName = profile.displayName;
        token.firstname = profile.firstname;
        token.lastname = profile.lastname;
        token.name = profile.uid;
        token.capabilities = profile.capabilities;
        token.accessTokenExpires = account.expires_at!;
        token.refreshToken = account.refresh_token;
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number) * 1000) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(process.env.ISC_BASE_API_URL!, token);
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.capabilities = token.capabilities as string[];
      session.user.tenant = token.tenant as string;
      session.user.name = token.name as string;
      session.user.firstname = token.firstname as string;
      session.user.lastname = token.lastname as string;
      session.user.uid = token.name as string;
      session.user.displayName = token.displayName as string;
      session.error = token.error;
      return session;
    },
  },
};

export function SailPointProvider(
  config: OAuthUserConfig<IdentitySecureCloudProfile> & {
    baseUrl: string;
    apiUrl: string;
    clientId: string;
    clientSecret: string;
    scope: string;
  }
): OAuthConfig<IdentitySecureCloudProfile> {
  return {
    id: 'identitySecureCloud',
    name: 'Identity Secure Cloud',
    type: 'oauth',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    authorization: {
      url: `${config.baseUrl}/oauth/authorize`,
      params: { scope: config.scope },
    },
    token: `${config.apiUrl}/oauth/token`,
    userinfo: `${config.apiUrl}/oauth/userinfo`,
    profile(profile: IdentitySecureCloudProfile) {
      return {
        tenant: profile.tenant,
        id: profile.id,
        uid: profile.uid,
        email: profile.email,
        phone: profile.phone,
        workPhone: profile.workPhone,
        firstname: profile.firstname,
        lastname: profile.lastname,
        capabilities: profile.capabilities,
        displayName: profile.displayName,
        name: profile.uid,
      };
    },
    options: config,
  };
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(apiUrl: string, token: any) {
  try {
    const reqParams = new URLSearchParams({
      client_id: process.env.ISC_CLIENT_ID!,
      client_secret: process.env.ISC_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    });

    const response = await axios.post(`${apiUrl}/oauth/token?${reqParams}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, expires_in, token_type, refresh_token } =
      response.data;

    return {
      ...token,
      accessToken: access_token,
      accessTokenExpires: Date.now() + expires_in,
      refreshToken: refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export interface IdentitySecureCloudProfile extends Record<string, any> {
  tenant: string;
  id: string;
  uid: string;
  email: string;
  phone: string;
  workPhone: string;
  firstname: string;
  lastname: string;
  capabilities: string[];
  displayName: string;
  name: string;
}
