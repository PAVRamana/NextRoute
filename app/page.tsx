'use client';

import { useSession } from 'next-auth/react';
import { StyledEngineProvider } from '@mui/material/styles';
import Header from './components/header';

export default function Home() {
  const { data: session } = useSession();
  return (
    <StyledEngineProvider injectFirst>
      {session ? <Header /> : <div>Loading...</div>}
    </StyledEngineProvider>
  );
}
