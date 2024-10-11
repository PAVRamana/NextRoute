import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Spinner } from '@wayfarer/components';
import { default_theme } from 'exp-ui-web-components-mfe';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AddAccessDataProvider } from './common/add-access-provider-context';
import { useFetchAddAccessData } from './common/add-access-provider-context/fetchData.hook';
import { GlobalStyles } from './common/global-styles';
import {
  initialSelectedEntitlementAccountsContext,
  SelectedEntitlementAccountsContextProvider,
} from './common/selected-accounts-context';

import {
  initialSelectedEntitlementsContext,
  SelectedEntitlementsContextProvider,
} from './common/selected-entitlement-context';
import {
  initialSelectedFormDataContext,
  SelectedFormDataContextProvider,
} from './common/selected-formdata-context';
import {
  initialSelectedUsersContext,
  SelectedUsersContextProvider,
} from './common/selected-users-context';
import PageLayout from './page-layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const addAccessProviderData = useFetchAddAccessData();

  return (
    <React.Fragment>
      {!addAccessProviderData ? (
        <Spinner appearance='branded' active />
      ) : (
        <QueryClientProvider client={queryClient}>
          <AddAccessDataProvider values={addAccessProviderData}>
            <SelectedUsersContextProvider params={initialSelectedUsersContext}>
              <SelectedEntitlementsContextProvider
                params={initialSelectedEntitlementsContext}
              >
                <SelectedEntitlementAccountsContextProvider
                  params={initialSelectedEntitlementAccountsContext}
                >
                  <SelectedFormDataContextProvider
                    params={initialSelectedFormDataContext}
                  >
                    <ThemeProvider theme={default_theme}>
                      <GlobalStyles />
                      <PageLayout />
                    </ThemeProvider>
                  </SelectedFormDataContextProvider>
                </SelectedEntitlementAccountsContextProvider>
              </SelectedEntitlementsContextProvider>
            </SelectedUsersContextProvider>
          </AddAccessDataProvider>
        </QueryClientProvider>
      )}
    </React.Fragment>
  );
}
