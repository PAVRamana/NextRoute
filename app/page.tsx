'use client';

import { signIn, useSession } from 'next-auth/react';
import {
  StyledEngineProvider,
  ThemeProvider as ThemeProviderMUI,
} from '@mui/material/styles';
import LandingPage from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FullPageLoader from './components/common/full-page-loader';
import Header from './components/common/header';
import { GlobalStyles } from './assets/theme/global-styles';
import { getMuiTheme } from './assets/theme/theme';
import { Provider } from 'react-redux';
import store from './components/common/service/redux/store';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function Home() {
  const { data: session } = useSession();
  const theme = getMuiTheme();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  console.log(11);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <ThemeProviderMUI theme={theme}>
            <GlobalStyles />
            {session && session?.accessToken ? (
              <LandingPage />
            ) : (
              <>
                <Header isLoadingPage={true} />
                <FullPageLoader />
              </>
            )}
          </ThemeProviderMUI>
        </Provider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}
