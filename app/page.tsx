'use client';

import { useSession } from 'next-auth/react';
import { StyledEngineProvider } from '@mui/material/styles';
import LandingPage from './components';
import FullPageLoader from './components/common/full-page-loader';
import Header from './components/common/header';

export default function Home() {
  const { data: session } = useSession();
  return (
    <StyledEngineProvider injectFirst>
      {session ? (
        <LandingPage />
      ) : (
        <div>
          <Header isPage={true} />
          <FullPageLoader />
        </div>
      )}
    </StyledEngineProvider>
  );
}
