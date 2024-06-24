'use client';

import { useSession } from 'next-auth/react';
import { StyledEngineProvider } from '@mui/material/styles';
import MenuBar from './menu';

export default function Home() {
  const { data: session } = useSession();
  return (
    <StyledEngineProvider injectFirst>
      {session ? <MenuBar /> : <div>Loading...</div>}
    </StyledEngineProvider>
  );
}
