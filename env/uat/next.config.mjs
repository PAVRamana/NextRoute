/* eslint-disable import/no-anonymous-default-export */
export default {
  env: {
    ISC_BASE_API_URL: 'https://123-poc.api.identitynow-demo.com',
    ISC_BASE_URL: 'https://123-poc.identitynow-demo.com',
    ISC_CLIENT_ID: 'b8cef674-b262-4cbe-99af-8ee14e9d2395',
    ISC_CLIENT_SECRET:
      '3e4ca4ff65dae3b9a7849de475b1737936b951edeb6ad505f5c61b76acc47224',
    NEXTAUTH_SECRET: 'khfhhjfhwie57whewiky34thiuty3489thiug',
    NEXTAUTH_URL: 'http://localhost:3000',
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
      },
    };
    return config;
  },
};
